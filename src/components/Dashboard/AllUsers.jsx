import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://tuki-server.onrender.com/admin/listusers");
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error(error);
      // Maneja el error de manera apropiada
    }
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      if (selectedUsers.length === 0) {
        throw new Error("Debe seleccionar al menos un usuario para eliminar");
      }

      const response = await axios.delete(
        "https://tuki-server.onrender.com/admin/listusers",
        {
          data: { ids: selectedUsers },
        }
      );
      const { message } = response.data;

      // Actualiza la lista de usuarios después de la eliminación
      fetchUsers();

      // Limpia la selección de usuarios
      setSelectedUsers([]);

      console.log(message); // Muestra el mensaje de éxito en la consola o haz lo que necesites con él
    } catch (error) {
      console.error(error);
      // Maneja el error de manera apropiada
    }
  };
  const handleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => handleUserSelection(user.id)}
          />
          <span>{user.nickname}</span>
        </div>
      ))}
      <button onClick={handleDeleteSelectedUsers}>
        Eliminar seleccionados
      </button>
    </div>
  );
}
