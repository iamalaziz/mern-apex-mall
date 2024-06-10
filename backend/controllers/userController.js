import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Auth User & get token
// @route   POST /api/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password!');
  }
});

// @desc    Register User
// @route   POST /api/users/login
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    User Profile
// @route   PUT /api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update Profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users list
// @route   GET /api/users/
// @access  Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   GET /api/users/:id
// @access  Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update User
// @route   GET /api/users/:id
// @access  Private/Admin

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Wishlist

// Function to get user with wishlist
export const getUserWithWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Error fetching user with wishlist:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Function to add to wishlist
export const handleWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; 
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    } else {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate('wishlist');
    res.status(200).json({ wishlist: updatedUser.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const removeLike = asyncHandler(async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const productIndex = user.wishlist.indexOf(productId);
    if (productIndex !== -1) {
      user.wishlist.splice(productIndex, 1);
      await user.save();
    } else {
      throw new Error('Product not in wishlist');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
});
