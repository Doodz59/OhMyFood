import User from '../mongodb/models/user.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
            name,
            email,
            avatar,
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allRestaurants");
       
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};
const getRestaurantInfoByUserID = async (req, res) => {
    const userId = req.params.userId; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête
  
    try {
      const restaurants = await Restaurant.find({ user: userId }); // Recherche les restaurants associés à l'utilisateur
  
      res.status(200).json(restaurants); // Renvoie les restaurants sous forme de réponse JSON
    } catch (error) {
      res.status(500).send(error.message); // Gère les erreurs et renvoie un code d'erreur HTTP approprié
    }
  }
export {
    getAllUsers,
    createUser,
    getUserInfoById,
    getRestaurantInfoByUserID
}