import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getRecommendations = async (req, res) => {
  console.log("hello");

  const { userHistory, foodlist } = req.body;

  const simplifiedUserHistory = userHistory.flatMap((order) =>
    order.items.map((item) => item.name)
  );

  try {
    const prompt = `Suggest 3 dishes from the following menu for someone who ordered ${simplifiedUserHistory.join(
      ", "
    )}:\n${foodlist
      .map((item) => `- ${item.name}: $${item.price}`)
      .join("\n")}`;

    console.log(prompt);

    //     // Call OpenAI API
    const recommendations = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(recommendations);
    
    //     // Extract and send recommendations
    const suggestedDishes = recommendations.choices[0].message.content;
    res.json({ recommendations: suggestedDishes });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recommendations" });
  }
};
