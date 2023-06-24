import {Button, Col, Divider, Form, Input, Modal, Row, Select} from "antd";
import {store} from "../../../../../store";
import './styles/ask-supervisor.css';
import React, {useEffect, useState} from "react";
import {
  askDudao, finishChatWithDudao,
  finishConsult,
  getAvailableDudaoList,
  sendMessage,
  startChatWithDudao
} from "../../../../../api/counselor";
import {computeDiffTime} from "../../../../../util/common";
import {addConsultTime} from "../../../../../store/actions/consultTime";
import {useTim} from "../../../../../util/tim";
import {setChatState} from "../../../../../store/actions/chatState";
import TIM from "tim-js-sdk/tim-js-friendship";
import TYPES = TIM.TYPES;
import {setChatId} from "../../../../../store/actions/dudaoChatId";

interface ConsultTimeProps {
  hours: number,
  minutes: number,
  seconds: number,
}

export function AskSupervisor(props) {
  const {inConsult, requestAskDudao } = props;
  const [finishOpen, setFinishOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false)
  const [finishForm] = Form.useForm();
  const [askForm] = Form.useForm();
  const {tim} = useTim();
  const [supervisorSelectList, setSupervisorSelectList] = useState([]);
  const state = store.getState();
  const [consultTime, setConsultTime]
    = useState<ConsultTimeProps>({hours: 0, minutes: 0, seconds: 0});
  const [chatOn, setChatOn] = useState(true);
  const [visitorName, setVisitorName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    const conversation = state.conversationContext.currentConversation;
    if (!conversation) {
      return;
    }
    let groupName = conversation.groupProfile.name;
    const indexOfNull = groupName.indexOf('_null');
    if (indexOfNull !== -1) {
      groupName = groupName.substring(0, indexOfNull);
    }
    const myName = store.getState().user.name;

    const visitorName = groupName.substring(myName.length);
    setVisitorName(visitorName);
  }, [state.conversationContext.currentConversation])

  useEffect(() => {
    const consultTimeMap = state.consultTime.consultTimeMap;
    const currentConversation = state.conversationContext.currentConversation;
    let startConsultTime = null;
    // already registered
    if (currentConversation && consultTimeMap.has(currentConversation.conversationID)) {
      startConsultTime = consultTimeMap.get(currentConversation.conversationID);
    } else if (currentConversation) {
      startConsultTime = new Date().getTime();
      store.dispatch(addConsultTime(currentConversation.conversationID, startConsultTime));
    }
    const chatStateMap = store.getState().chatState.chatStateMap;
    // chat is finished
    if (currentConversation && chatStateMap.has(currentConversation.conversationID)) {
      const finishTime = chatStateMap.get(currentConversation.conversationID);
      const {hours, minutes, seconds} = computeDiffTime(finishTime, startConsultTime);
      setConsultTime(
        {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      setChatOn(false);
      return;
    }
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const {hours, minutes, seconds} = computeDiffTime(now, startConsultTime);
      setConsultTime(
        {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
    })
    return () => clearInterval(interval);
    // setConsultTime({seconds: seconds, hours: hours, minutes: minutes});
  }, [state.conversationContext.currentConversation, state.chatState]);

  const onFinishOk = () => {
    finishForm.validateFields()
      .then((values) => {
        console.log('test_finish_consult', values);
        const conversation = store.getState().conversationContext.currentConversation;
        console.log('onFinishOk', conversation);
        store.dispatch(setChatState(conversation.conversationID, new Date().getTime()));
        let groupName = conversation.groupProfile.name;
        const indexOfNull = groupName.indexOf('_null');
        if (indexOfNull !== -1) {
          groupName = groupName.substring(0, indexOfNull);
        }
        const myName = store.getState().user.name;

        const visitorName = groupName.substring(myName.length);
        console.log('finishConsult_Result', visitorName);
        finishConsult(visitorName, myName, values.judge);

        const askDudaoMap = store.getState().counselor.askDudaoList;
        if (askDudaoMap.has(conversation.conversationID)) {
          const chatID = store.getState().dudaoChatId.chatIDMap.get(conversation.conversationID);
          console.log('onFinishOk', chatID);
          finishChatWithDudao(chatID);
        }

        setComment(values.judge);
        setFinishOpen(false);
        finishForm.resetFields();
      })
  };

  const onFinishCancel = () => {
    setFinishOpen(false);
    finishForm.resetFields();
  }

  const onAskDudaoButtonClick = async () => {
    getAvailableDudaoList()
      .then(res => {
        const ret = res.data.items.map(item => {
          return {label: item.name, value: item.imid};
        })
        setSupervisorSelectList(ret);
        return ret;
      })
    setAskOpen(true);
  }

  const onAskOk = () => {
    setAskOpen(false);
    const group_id = store.getState().conversationContext.currentConversation.groupProfile.groupID;
    askForm.validateFields()
      .then((values) => {
        const dudaoID = values.dudao.value;
        askDudao(group_id, dudaoID);
        const counselor = store.getState().user.name;
        const supervisor = values.dudao.label;
        const imid = store.getState().login.imid;
        const conversation = store.getState().conversationContext.currentConversation;
        const message = tim?.createTextMessage({
          to: dudaoID,
          conversationType: TYPES.CONV_C2C,
          payload: {
            text: "求助开始"
          },
        });
        tim?.sendMessage(message)
          .then(r => {
            requestAskDudao(dudaoID);
            console.log('onAskOk', counselor);
            console.log('onAskOk', supervisor);
            startChatWithDudao(counselor, supervisor)
              .then(res => {
                const id = res.data.id;
                console.log('onAskOk', id);
                store.dispatch(setChatId(conversation.conversationID, id));
              });
          })
        // sendMessage(imid, dudaoID, "求助开始")
        //   .then(r => {
        //     requestAskDudao(dudaoID);
        //     startChatWithDudao(counselor, supervisor);
        //   });
      })
  }

  const onAskCancel = () => {
    askForm.resetFields();
    setAskOpen(false);
  }

  const onFinishConsult = () => {
    setFinishOpen(true);
  }

  return (
    <div className={'ask-supervisor'}>
      <Col>
        <Row style={{height: "10%"}}>
          <FangkeInformation name={visitorName}/>
        </Row>
        <Row>
          <Divider style={{color: "black"}}/>
        </Row>
        <Row style={{height: "60%"}}>
          <ConsultInformation consultTime={consultTime} chatOn={chatOn} comment={comment}/>
        </Row>
        <Row>
          <Divider style={{color: "black"}}/>
        </Row>
        {chatOn && !inConsult &&
          <Row>
            <Button onClick={onAskDudaoButtonClick}>请求督导</Button>
          </Row>
        }
        {chatOn && inConsult &&
          <Row>
            <h1 style={{textAlign: 'center', padding: '8px'}}>请求督导中</h1>
          </Row>
        }
        <Row>
          <div style={{padding: '2px', width: '87.6px'}}></div>
        </Row>
        {chatOn && <Row>
          <Button onClick={onFinishConsult}>结束咨询</Button>
        </Row>
        }
      </Col>
      <Modal
        title={"选择督导"}
        open={askOpen}
        centered
        onOk={onAskOk}
        onCancel={onAskCancel}
        okText={'请求'}
        cancelText={'取消'}
      >
        <Form
          form={askForm}
          name="basic"
          labelCol={{span: 6}}
          wrapperCol={{span: 22}}
          layout={"vertical"}
          initialValues={{remember: true}}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label={'选中的督导'} name={'dudao'}>
            <Select
              labelInValue
              style={{width: '100%'}}
              placeholder="Please select"
              options={supervisorSelectList}
              optionLabelProp="label"
              maxTagCount="responsive"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"咨询评价"}
        open={finishOpen}
        centered
        onOk={onFinishOk}
        onCancel={onFinishCancel}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form
          form={finishForm}
          name="basic"
          labelCol={{span: 6}}
          wrapperCol={{span: 22}}
          layout={"vertical"}
          initialValues={{remember: true}}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label={'评价'} name={'judge'}>
            <Input placeholder={'请输入'}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

function FangkeInformation(props) {
  const {name} = props;
  return (
    <div>
      <div style={{padding: '16px'}}></div>
      <h1 style={{textAlign: 'center', width: '87.6px'}}>{name}</h1>
    </div>
  )
}

function ConsultInformation(props) {
  const {consultTime, chatOn, comment} = props;
  const {hours, minutes, seconds} = consultTime;
  return (
    <div style={{textAlign: 'center', width: '87.6px'}}>
      <h1>{chatOn ? '正在咨询中' : '咨询结束'}</h1>
      <div style={{padding: '8px', textAlign: 'center'}}></div>
      <div>已咨询时间</div>
      <div style={{padding: '8px'}}></div>
      <div>
        <MyStopwatch hours={hours} minutes={minutes} seconds={seconds}/>
      </div>
      <div style={{padding: '8px'}}></div>
      {!chatOn && <div>咨询师评价</div>}
      <div style={{padding: '8px'}}></div>
      {!chatOn && <div style={{wordWrap: 'break-word'}}>{comment}</div>}
    </div>
  )
}

function MyStopwatch(props) {
  const {hours, minutes, seconds} = props;

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '20px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
