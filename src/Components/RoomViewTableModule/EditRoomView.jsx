import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseDialog from '../../Common/BaseDialog';
import RoomViewForm from './RoomViewForm/RoomViewForm';
import RoomView from '../../Models/RoomView';
import RoomViewWarningContentComponent from './RoomViewWarningContentComponent';

const EditRoomView = ({ open, close, roomView, updateRoomView, onSuccess }) => {
  const [error, setError] = useState(null);
  const [updatingRoomView, setUpdatingRoomView] = useState({ ...roomView });

  const formTitle = `View with id ${roomView.id} update`;
  const formSubmitText = 'Apply changes';

  const updateRoomViewAsync = async () => {
    const [roomViewResponse, errorResponse] = await updateRoomView(
      updatingRoomView
    );

    if (errorResponse) {
      setError(errorResponse);
    } else {
      onSuccess(`Room view ${roomViewResponse.name} successfully updated`);
      close();
    }
  };

  const handleSubmit = (values) => {
    const newRoomView = new RoomView(values);

    setUpdatingRoomView(newRoomView);
  };

  const handleCancel = () => {
    setError('Updating canceled');
  };

  const handleAccept = async () => {
    if (updatingRoomView) {
      await updateRoomViewAsync();
    }
  };

  const handleResetError = () => {
    setError(null);
  };

  const warningContent = (
    <RoomViewWarningContentComponent
      text={`Room view "${updatingRoomView?.name}" is going to be updated. Accept or decline the updating`}
      roomView={updatingRoomView}
    />
  );

  return (
    <BaseDialog open={open} close={close} title={formTitle}>
      <RoomViewForm
        roomView={updatingRoomView}
        submitText={formSubmitText}
        submitHandler={handleSubmit}
        error={error}
        resetError={handleResetError}
        onAccept={handleAccept}
        onCancel={handleCancel}
        warningContent={warningContent}
        warningTitle="Updating of the view"
        type="update"
      />
    </BaseDialog>
  );
};

EditRoomView.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  roomView: PropTypes.instanceOf(RoomView).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditRoomView;
