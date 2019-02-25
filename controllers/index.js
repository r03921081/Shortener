exports.getHomePage = (req, res) => {
    console.log("HomePage");
    res.status(200).json({
        message: 'Get home page.'
    });
};