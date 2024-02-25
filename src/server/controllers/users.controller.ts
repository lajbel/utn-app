import { GetUserRequest, UpdateUserRequest } from "@/types/user.ts";
import { getDownloadURL } from "firebase/storage";
import { uploadImage } from "../firebase.ts";
import { resInternalServerError } from "../lib/responses.ts";
import UserModel from "../models/User.ts";

export const getUser: GetUserRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user: user.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};

export const updateUser: UpdateUserRequest = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const profilePhoto = req.files?.profilePhoto;

    try {
        let uploadedImageURL = "";

        if (profilePhoto) {
            if (Array.isArray(profilePhoto)) {
                return res.status(400).json({
                    message: "Please upload only one image",
                });
            }

            const uploadedImage = await uploadImage(
                profilePhoto,
                `avatars/${id}`,
            );

            uploadedImageURL = await getDownloadURL(uploadedImage.ref);
        }

        const updatedUser = uploadedImageURL
            ? { ...body, profilePhoto: uploadedImageURL }
            : body;

        const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
            new: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: user.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};
