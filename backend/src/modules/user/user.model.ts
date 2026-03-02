import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: { type: String, required: true, select: false },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};






export const User = mongoose.model<IUser>("User", userSchema);