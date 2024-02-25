import { User } from "@/types/user";
import { useFormik } from "formik";
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import { Button, FileInput, Form, Input, Modal } from "react-daisyui";
import { updateUserRequest } from "../../api/user";
import { useAuth } from "../../context/AuthContext";

export type ProfileFormHandles = {
    handleSubmit: () => void;
};

export type Props = {
    user: User;
    onUserUpdate?: (user: User) => void;
};

const EditProfileForm = forwardRef<ProfileFormHandles, Props>((props, ref) => {
    const { user } = useAuth();
    const formik = useFormik({
        initialValues: {
            profileDescription: props.user.profileDescription || "",
            profilePhoto: undefined,
        },
        onSubmit: async (values) => {
            const { data } = await updateUserRequest(user?._id!, values);
            props.onUserUpdate?.(data.user);
        },
    });

    useImperativeHandle(ref, () => ({
        handleSubmit: formik.handleSubmit,
        newProfile: formik.values,
    }));

    return (
        <>
            <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Form.Label title="Bio" htmlFor="profileDescription" />
                <Input
                    id="profileDescription"
                    type="text"
                    placeholder="I'm a chef and I love to cook!"
                    className="input-ghost"
                    required
                    maxLength={100}
                    onChange={formik.handleChange}
                    value={formik.values.profileDescription}
                />

                <Form.Label title="Profile Photo" htmlFor="profilePhoto" />
                <FileInput
                    id="profilePhoto"
                    className="input-ghost"
                    required
                    onChange={(e) => {
                        formik.setFieldValue(
                            "profilePhoto",
                            e.target.files![0],
                        );
                    }}
                />
            </Form>
        </>
    );
});

export type ModalHandles = {
    handleShow: () => void;
    form: ProfileFormHandles | null;
};

export const EditProfileModal = forwardRef<ModalHandles, Props>(
    (props, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const formRef = useRef<ProfileFormHandles>(null);

        const handleShow = useCallback(() => {
            dialogRef.current?.showModal();
        }, []);

        const handleSave = () => {
            formRef.current?.handleSubmit();
            dialogRef.current?.close();
        };

        useImperativeHandle(ref, () => ({
            handleShow,
            form: formRef.current,
        }));

        return (
            <Modal ref={dialogRef}>
                <Modal.Header className="font-bold">Edit Profile</Modal.Header>
                <Modal.Body>
                    <EditProfileForm
                        user={props.user}
                        onUserUpdate={props.onUserUpdate}
                        ref={formRef}
                    />
                </Modal.Body>
                <Modal.Actions>
                    <Button
                        onClick={handleSave}
                        type="submit"
                    >
                        Save
                    </Button>
                    <form method="dialog">
                        <Button>Close</Button>
                    </form>
                </Modal.Actions>
            </Modal>
        );
    },
);

export default EditProfileForm;
