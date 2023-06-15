export type SignUpResponse =
    | {
          success: true;
      }
    | {
          success: false;
          reason: "email existed" | "username existed" | "unknown";
      };
