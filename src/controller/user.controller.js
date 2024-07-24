import { asyncHandler, testHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";
const registerTest = testHandler((the = 3) => {
    res.status(200).json({ message: 'ok' })
})
const registerUser = asyncHandler(async (req, res, next) => {
    const { email, username, password, fullname, } = req.body
    if (fullname === '' || email == ``) {
        throw new ApiError(400, "Need fields required")
    }
    const existedUser = await User.find({ $or: [{ email }, { username }] })
    if (existedUser) {
        throw new ApiError(400, "Already User Exist")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    const user = User.create({ fullname, avatar: avatar.url, coverImage: coverImage?.url || "", email, password, username: username?.toLowerCase() })

    const createdUser = await User.findById(user._id).select('-refreshToken -password')
    if (!createdUser) {
        throw new ApiError(500, "something went wrong")
    }
    return res.send(201).json(new ApiResponse(200, createdUser, "User registered successfully"))


})
export { registerUser, registerTest }