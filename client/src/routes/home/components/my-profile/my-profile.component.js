import React from 'react';
import './my-profile.component.scss';
import { Button, Modal } from 'antd';
import { MyProfileContext } from '../../../../contexts/my-profile.context';

export const MyProfileComponent = React.forwardRef((props, ref) => {
    const { myProfile } = React.useContext(MyProfileContext);
    const [visible, setVisible] = React.useState(false);

    function closeModal() {
        setVisible(false);
    }

    React.useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
        },
    }));


    return <Modal
        destroyOnClose={true}
        title={myProfile.username}
        visible={visible}
        onCancel={closeModal}
        footer={[
            <Button key='back' onClick={closeModal}>
                Close
            </Button>
        ]}
    >
        <div>
            Role: {myProfile.role}
        </div>
    </Modal>;
});
