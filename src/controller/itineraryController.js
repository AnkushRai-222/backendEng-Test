const Itinerary = require('../model/UserItinerary');

const createItinerary = async (req, res) => {
  try {
    const { destination, startDate, endDate, activities, accommodations } = req.body;

    const itinerary = new Itinerary({
      destination,
      startDate,
      endDate,
      activities,
      accommodations,
      user: req.user._id // Attach the user ID to the itinerary
    });

    await itinerary.save();

    res.status(201).json({ message: 'Itinerary created successfully', itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id; 
    const userId = req.user._id; 

    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: itineraryId, user: userId },
      req.body, // Update the itinerary with the request body
      { new: true } 
    );

    res.json({ message: 'Itinerary updated successfully', itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;

    const itinerary = await Itinerary.findOneAndDelete({ _id: id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports ={createItinerary,getItinerary,deleteItinerary,updateItinerary}