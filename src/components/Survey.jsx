import React from 'react';
import './survey.css';
import { Form, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';

const Survey = () => {
  const [form] = useForm();

  const onSubmit = data => {
      console.log(data);  // { name: ... }
  }

  return (
    <div class="formbold-main-wrapper">
      <div class="formbold-form-wrapper">
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <img src="/assets/images/survey.webp" />
        </div>

        
        
        <Form layout='vertical' className='form-survey' form={form} onFinish={onSubmit}> 
          <Form.Item label="Cau 1" name="cau1">
            <Radio.Group name='cau1'>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
              <Radio value={5}>E</Radio>
            </Radio.Group>
          </Form.Item>
          
          <div class="formbold-mb-3">
            <label for="message" class="formbold-form-label">
              What should we change in oirder to live up to your expectations?
            </label>
            <textarea
              rows="6"
              name="message"
              id="message"
              class="formbold-form-input"
            ></textarea>
          </div>

          <div>
            <label for="email" class="formbold-form-label"> Email <span>(Only if you want to hear more from us)</span> </label>
            <input
              type="email"
              name="email"
              id="email"
              class="formbold-form-input"
            />
          </div>

          <button class="formbold-btn">Send survey</button>
        </Form>
      </div>
    </div>
  )
}

export default Survey;