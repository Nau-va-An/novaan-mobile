// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type SignUpResponse =
    | {
          success: true;
      }
    | {
          success: false;
          reason: "email exists" | "username exists" | "unknown";
      };
