import { GetUserRequest } from "@/types/user.ts";
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
