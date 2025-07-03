// import React from "react";
import { FloatButton, Modal } from "antd";
import { Button } from "antd/es/radio";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import request from "../services/index";
import { LOGIN_CREATE } from "../constans/index";
import { toast } from "react-toastify";
import { UserCard } from "../components/UserCard";

export const Home = ({ fristName, lastName, email, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editeUsers, setEditUsers] = useState({});
  const [editedUserId, setEditedUserId] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //post qilish
  const onSubmit = async (data) => {
    try {
      const res = await request.post(LOGIN_CREATE, data);
      toast.success("Muvaffaqiyatli qo‘shildi");

      // Yangi ro'yxatni olish va yangilash
      const updatedUsers = await request.get(LOGIN_CREATE);
      setUsers(updatedUsers.data);

      reset();
      setIsModalOpen(false); // Modalni yopish
    } catch (error) {
      console.log(error);
      toast.error("Qo‘shishda xatolik");
    }
  };

  // get qilib olish

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const res = await request.get(LOGIN_CREATE);
        setUsers(res.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchLogins();
  }, []);

  const getUserById = async (id) => {
    try {
      const res = await request.get(`${LOGIN_CREATE}/${id}/`);
      setEditUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const hendelEdit = (id) => {
    setEditedUserId(id);
    setIsModalOpen(true);
    getUserById(id);
  };

  // userlarni id buyicha delat qilish
  const handleDelete = async (id) => {
    try {
      await request.delete(`${LOGIN_CREATE}/${id}/`);
      toast.success("Foydalanuvchi o'chirildi");

      // Yangilangan ro'yxatni olish
      const res = await request.get(LOGIN_CREATE);
      setUsers(res.data);
    } catch (error) {
      toast.error("O‘chirishda xatolik yuz berdi");
    }
  };

  return (
    <div className="flex flex-col items-center pt-48 h-[100vh] bg-gray-300 ">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        footer
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          className="flex flex-col justify-self-start gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
            <label htmlFor="fristName">Frist Name</label>
            <input
              value={editeUsers.fristName}
              className="border-1 border-gray-600 rounded-[4px]"
              type="text"
              id="fristName"
              {...register("fristName", { required: "Enter Your Frist Name" })}
            />
            {errors.fristName && (
              <p className="text-red-500">{errors.fristName.message}</p>
            )}
          </div>
          <div className="flex gap-2">
            <label htmlFor="lastName">Frist Name</label>
            <input
              // onChange={}
              value={editeUsers.lastName}
              className="border-1 border-gray-600 rounded-[4px]"
              type="text"
              id="lastName"
              {...register("lastName", { required: "Enter Your Last Name" })}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="flex gap-10">
            <label htmlFor="email">Email</label>
            <input
              value={editeUsers.email}
              className="border-1 border-gray-600 rounded-[4px]"
              type="text"
              id="email"
              {...register("email", {
                required: "Enter Your Email Adress",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invaled Your Adress",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <button onClick={handleCancel} type="submit">
            Click
          </button>
        </form>
      </Modal>

      <div className="grid grid-cols-4 gap-5 mt-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            firstName={user.fristName}
            lastName={user.lastName}
            email={user.email}
            onEdit={() => hendelEdit(user.id)}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
    </div>
  );
};
