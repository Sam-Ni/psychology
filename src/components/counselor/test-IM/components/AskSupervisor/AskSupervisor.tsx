import {Button, Col, Divider, Form, Input, Modal, Row, Select, Space, Statistic} from "antd";
import {useNavigate} from "react-router-dom";
import {store} from "../../../../../store";
import './styles/ask-supervisor.css';
import React, {useContext, useState} from "react";
import formatters from "chart.js/dist/core/core.ticks";
import {UserContext} from "../../../../../Init";
import {askDudao, getAvailableDudaoList, sendMessage} from "../../../../../api/counselor";
import {getID} from "../../../../../util/common";

export function AskSupervisor(props) {
  const {inConsult} = props;
  const [finishOpen, setFinishOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false)
  const [finishForm] = Form.useForm();
  const [askForm] = Form.useForm();
  const {tim} = useContext(UserContext);
  const [supervisorSelectList, setSupervisorSelectList] = useState([]);
  const onFinishOk = ()=>{
    finishForm.validateFields()
      .then((values)=> {
        console.log('test_finish_consult', values);
        // tim?.getGroupMemberList('')
        tim?.getMessageList(
          {conversationID:
            store.getState().conversationContext.currentConversation.conversationID})
          .then(res=>{
            const messageList = res.data.messageList;
            const textMessageList = messageList.filter(item=>item.type === 'TIMTextElem');
            console.log('test_finish_con', store.getState().conversationContext.currentConversation);
            console.log('test_finish_con', res.data);
            console.log('test_finish_get_group_member', )
          })
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
      .then(res=>{
        const r : any = res;
        const ret = r.items.map(item=>{
          return {label:item.name, value: item.imid};
        })
        setSupervisorSelectList(ret);
        return ret;
      })
    setAskOpen(true);
  }

  const onAskOk = ()=>{
    setAskOpen(false);
    const group_id = store.getState().conversationContext.currentConversation.groupProfile.groupID;
    askForm.validateFields()
      .then((values)=> {
        const dudaoID = values.dudao.value;
        askDudao(group_id, dudaoID);
        sendMessage(dudaoID, "求助开始");
      })
  }

  const onAskCancel = () => {
    askForm.resetFields();
    setAskOpen(false);
  }

  return (
    <div className={'ask-supervisor'}>
      <Col>
        <Row style={{ height:"10%"}}>
          <FangkeInformation name={'张先生'} />
        </Row>
        <Row>
          <Divider style={{color:"black"}}/>
        </Row>
        <Row style={{ height:"60%"}}>
          <ConsultInformation consultTime={1}/>
        </Row>
        <Row>
          <Divider style={{color:"black"}}/>
        </Row>
        {!inConsult &&
          <Row>
            <Button onClick={onAskDudaoButtonClick}>请求督导</Button>
          </Row>
        }
        {inConsult &&
          <Row>
            <h1 style={{textAlign:'center', padding:'8px'}}>请求督导中</h1>
          </Row>
        }
        <Row>
          <div style={{padding:'2px'}}></div>
        </Row>
        <Row>
          <Button onClick={()=>setFinishOpen(true)}>结束咨询</Button>
        </Row>
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 22 }}
          layout={"vertical"}
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label={'选中的督导'} name={'dudao'}>
            <Select
              labelInValue
              style={{ width: '100%' }}
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 22 }}
          layout={"vertical"}
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label={'评价'} name={'judge'}>
            <Input placeholder={'请输入'} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

function FangkeInformation(props) {
  const { name } = props;
  return (
    <div>{name}</div>
  )
}

function ConsultInformation(props) {
  const { consultTime } = props;
  return (
    <div>
      <h1>正在咨询中</h1>
      <div style={{padding:'8px'}}></div>
      <Statistic title={'已咨询时间'} value={consultTime} style={{textAlign:"center"}} />
    </div>
  )
}
