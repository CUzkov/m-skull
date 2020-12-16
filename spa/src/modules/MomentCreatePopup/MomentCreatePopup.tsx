import * as React from "react";
import {ReactElement, FC, useRef} from 'react';
import {isMobile} from 'react-device-detect';
import {Form, Field} from 'react-final-form';
import {useSelector} from 'react-redux';

import { APIUser } from "utils/api";
import {ICreateMomentSlab} from 'types/moments';
import {IUserStore} from 'types/user';

import './moment-create-popup.scss'
import { ioIError } from "types/common";

interface MomentCreatePopupProps {
  toggleModal: () => void
}

export const MomentCreatePopup: FC<MomentCreatePopupProps> = ({
  toggleModal
}: MomentCreatePopupProps): ReactElement => {

  const userStore: IUserStore = useSelector(state => state.user);
  const inputRef = useRef(null);
  const submitHandler = (values: ICreateMomentSlab, form: any): void => {
    values.user_id = userStore.id;
    values.img = inputRef.current.files;
    APIUser.createMoment('', values)
      .then(res => {
        if (!ioIError(res)) {
          alert("Success")
        } else {
          alert("Some error, try again")
        }
        toggleModal();
      })
  }

  return(
    <div className={isMobile ? 'moment-create-popup-mob' : 'moment-create-popup'}>
      <div className={'background'} onClick={toggleModal} />
      <div className={'content'}>
        <Form
          onSubmit={submitHandler}
        >
          {props => (
            <form onSubmit={props.handleSubmit} className={'form F-C-SP'} >
              <Field name={'title'} component={'input'} />
              <Field name={'description'} component={'textarea'} />
              <input
                type={'file'}
                multiple
                ref={inputRef}
              />
              <div className={'F-R-SP'}>
                <button onClick={toggleModal}>Отменить</button>
                <button type={'submit'}>Создать</button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
}
