const { Community, User } = require('../models');
const { createDiscordServer } = require('../utils/discordServer');

const createCommunity = async (communityName, description) => {
  try {
    const existingCommunity = await Community.findOne({ name: communityName });
    if (existingCommunity) {
      return { success: false, message: 'A community with that name already exists.' };
    }

    const newCommunity = new Community({
      name: communityName,
      description,
      memberCount: 0,
      serverLink: null,
    });

    const savedCommunity = await newCommunity.save();

    const server = await createDiscordServer(communityName, description);
    savedCommunity.serverLink = server.guild.id;
    await savedCommunity.save();

    return { success: true, message: 'Community successfully created!' };
  } catch (error) {
    console.error('Error creating community:', error);
    return { success: false, message: 'An error occurred while creating the community.' };
  }
};

const joinCommunity = async (userId, communityName) => {
  try {
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return { success: false, message: 'No community with that name exists.' };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.communities.includes(community._id)) {
      return { success: false, message: 'You are already a member of this community.' };
    }

    user.communities.push(community._id);
    await user.save();

    community.memberCount += 1;
    await community.save();

    return { success: true, message: 'You have successfully joined the community!' };
  } catch (error) {
    console.error('Error joining community:', error);
    return { success: false, message: 'An error occurred while joining the community.' };
  }
};

const leaveCommunity = async (userId, communityName) => {
  try {
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return { success: false, message: 'No community with that name exists.' };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (!user.communities.includes(community._id)) {
      return { success: false, message: 'You are not a member of this community.' };
    }

    user.communities = user.communities.filter(id => id !== community._id);
    await user.save();

    community.memberCount -= 1;
    await community.save();

    return { success: true, message: 'You have successfully left the community.' };
  } catch (error) {
    console.error('Error leaving community:', error);
    return { success: false, message: 'An error occurred while leaving the community.' };
  }
};

const getCommunityInfo = async (communityName) => {
  try {
    const community = await Community.findOne({ name: communityName }).populate('memberCount');
    if (!community) {
      return null;
    }

    return {
      name: community.name,
      description: community.description,
      memberCount: community.memberCount,
      serverLink: community.serverLink,
    };
  } catch (error) {
    console.error('Error getting community information:', error);
    return null;
  }
};

const listCommunities = async () => {
  try {
    const communities = await Community.find({}).populate('memberCount');
    return communities.map(community => ({
      name: community.name,
      description: community.description,
      memberCount: community.memberCount,
    }));
  } catch (error) {
    console.error('Error listing communities:', error);
    return [];
  }
};

module.exports = {
  createCommunity,
  joinCommunity,
  leaveCommunity,
  getCommunityInfo,
  listCommunities,
};