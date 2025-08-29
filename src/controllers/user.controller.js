import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudniary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  // get user details from frontend
  // validation - not empty 
  // check if user already exits: username, email
  // check for images, check for avtar
  // upload them to cloudinary, avatar
  // create user object = create entry in db 
  // remove password and refresh token from response
  // check for user creation
  // return response

  const {fullName, email, username, password} = req.body
  console.log("username: ", username);
  
  if ( [fullName, email, username, password].some((field) => field?.trim() === "") ) {
    throw new ApiError(400, "All fields are required")    
  }

 const existedUser = await User.findOne({
    $or: [{username}, {email}]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist")
  }

  const avatatLocalPath = req.files?.avatar[0]?.path;
  const  coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatatLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const Avatar =  await uploadOnCloudniary(avatatLocalPath);
  const coverImage = await uploadOnCloudniary(coverImageLocalPath);

  if (!Avatar) {
    throw new ApiError(400, "Avatar file is required")
  }

 const user = await User.create({
    fullName,
    avatar: Avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered successfully")
  )
  // return  res.status(200).json({
  //       message: "Hariom Bhojnalaya"
  //   })
} )

export {registerUser}