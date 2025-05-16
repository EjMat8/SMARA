import { OpenAI } from "openai";
import dotenv from "dotenv";
// import { appData } from "./testData.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAISummary(app) {
  const prompt = `
You are a mobile app researcher. Based on the following app data, generate a short summary (2–3 sentences) highlighting:

- Key features or functionality
- Monetization model (free, paid, IAP)
- Privacy risks or notable permissions
- Any other notable observations

App Data:
- Title: ${app.title}
- Developer: ${app.developer}
- Rating: ${app.score}, Installs: ${app.installs}, Number of Ratings: ${
    app.ratings
  }
- Free: ${app.free ? "Yes" : "No"}, Price: ${app.price}
- Offers IAP: ${app.offersIAP ? "Yes" : "No"}, IAP Range: ${
    app.IAPRange || "N/A"
  }
- Permissions: ${[...new Set(app.permissions.map((perm) => perm.type))].join(
    ", "
  )}
- Categories: ${app.categories.map((categ) => categ.name).join(", ")}
- Content Rating: ${app.contentRating || "N/A"}
- Data Shared w/Third Parties: ${app.dataShared
    .map((item) => item.data)
    .join(", ")}
- Data Collected: ${[
    ...new Set(app.dataCollected.map((item) => item.type)),
  ].join(", ")}
- Security Practices: ${app.securityPractices
    .map((practice) => practice.practice)
    .join("; ")}
- Privacy Policy: ${app.privacyPolicyUrl || "N/A"}

Generate an executive summary based on this information.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
}
