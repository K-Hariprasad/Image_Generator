const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const {prompt, n, size} = req.body
    const response = await openai.createImage({
      prompt,
      n,
      size,
    });
    image_urls = response.data.data;
    res.status(200).json({ success: true, data: image_urls });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: "Couldn't generate image. Please try again",
    });
  }
};

module.exports = { generateImage };
