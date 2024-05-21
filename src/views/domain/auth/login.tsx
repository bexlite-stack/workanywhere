import { TemplateAuth } from "../../templates/templateAuth";
import { TemplateBase } from "../../templates/templateBase";
import { SocialLogin } from "./socialLogin";

export const Login = () => {
  return (
    <TemplateAuth>
      <section>
        <h1>Login</h1>
        <p>Welcome back! please login</p>
      </section>
      <form hx-post="/login" hx-target="#message" class="space-y-2">
        <input name="email" placeholder="Email" required />
        <input name="password" placeholder="Password" type="password" required />
        <button type="submit">Login</button>
        <SocialLogin />
      </form>
      <div id="message"></div>
      <div>
        Don't have an account yet ? <a href="/register">Register</a>
      </div>
    </TemplateAuth>
  );
};
