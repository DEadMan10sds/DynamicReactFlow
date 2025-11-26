import { useEditUserMutation } from "../api/UserApi";

export const UsersManager = () => {
  const [editUser, { error }] = useEditUserMutation();

  return (
    <button
      onClick={async () => {
        await editUser({ id: 2, name: "pedro", surname: "d" });
        if (error) console.error(error);
      }}
    >
      a
    </button>
  );
};
