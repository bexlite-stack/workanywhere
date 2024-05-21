import { TemplateAuth } from "../../templates/templateAuth";
import { TemplateBase } from "../../templates/templateBase";
import { SocialLogin } from "./socialLogin";

export const Register = () => {
  return (
    <TemplateAuth>
      <section>
        <h1>Register</h1>
        <p>Create an account to get started</p>
      </section>
      <form hx-post="/register" hx-target="#message" class="space-y-2">
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" placeholder="Password" type="password" required />
        <button type="submit">Register</button>
        <SocialLogin />
      </form>
      <div id="message"></div>
      <div>
        Have an account already? <a href="/login">Login</a>
      </div>
    </TemplateAuth>
  );
};
