import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import {  signIn, signOut, useSession} from "next-auth/react";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <>
      <button type="button" className={styles.SignInButton}>
        <FaGithub color="#009e0f" onClick={() => signOut()} />
        {session.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    </>
  ) : (
    <>
      <button
        type="button"
        className={styles.SignInButton}
        onClick={() => signIn("github")}
      >
        <FaGithub color="#F6E05E" />
        Sign In with Github
      </button>
    </>
  );
}
