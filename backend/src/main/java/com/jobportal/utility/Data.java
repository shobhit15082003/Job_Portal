package com.jobportal.utility;

public class Data {
    public static String getMessageBody(String name, String otp){
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "  <meta charset=\"UTF-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "  <title>OTP Verification</title>\n" +
                "  <style>\n" +
                "    body {\n" +
                "      font-family: Arial, sans-serif;\n" +
                "      background-color: #f4f6f8;\n" +
                "      margin: 0;\n" +
                "      padding: 0;\n" +
                "    }\n" +
                "    .container {\n" +
                "      max-width: 600px;\n" +
                "      background-color: #ffffff;\n" +
                "      margin: 30px auto;\n" +
                "      padding: 30px;\n" +
                "      border-radius: 10px;\n" +
                "      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n" +
                "    }\n" +
                "    .header {\n" +
                "      text-align: center;\n" +
                "      margin-bottom: 30px;\n" +
                "    }\n" +
                "    .otp {\n" +
                "      font-size: 24px;\n" +
                "      font-weight: bold;\n" +
                "      background-color: #f0f0f0;\n" +
                "      padding: 15px;\n" +
                "      border-radius: 8px;\n" +
                "      text-align: center;\n" +
                "      letter-spacing: 6px;\n" +
                "      margin: 20px 0;\n" +
                "      user-select: all;\n" +
                "    }\n" +
                "    .footer {\n" +
                "      margin-top: 30px;\n" +
                "      font-size: 14px;\n" +
                "      color: #888;\n" +
                "      text-align: center;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"container\">\n" +
                "    <div class=\"header\">\n" +
                "      <h2>Hello " + name + ",</h2>\n" +
                "      <p>Use the OTP below to verify your email address.</p>\n" +
                "    </div>\n" +
                "    <div class=\"otp\">" + otp + "</div>\n" +
                "    <p style=\"text-align: center;\">\n" +
                "      This OTP is valid for the next <strong>10 minutes</strong>.<br>\n" +
                "      Please do not share this code with anyone.\n" +
                "    </p>\n" +
                "    <div class=\"footer\">\n" +
                "      <p>If you did not request this, please ignore this email.</p>\n" +
                "      <p>&copy; 2025 JobHook</p>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
