export async function authMiddleware(req: Request, supabase: any) {
    const authHeader = req.headers.get("Authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ Invalid or missing Authorization header.");
      return new Response(JSON.stringify({ error: "Unauthorized: No token provided" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const token = authHeader.replace("Bearer ", "").trim();
    const { data, error } = await supabase.auth.getUser(token);
  
    if (error || !data?.user) {
      console.error("❌ Auth failed:", error);
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    console.log(`✅ User authenticated: ${data.user.id}`);
    return data.user; // 🔥 Retourne l'utilisateur validé
  }
  