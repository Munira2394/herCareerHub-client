import { useState } from "react";
import useAxiosSecureHook from "../../hook/useAxiosSecureHook";
import useAuthContextHook from "../../hook/useAuthContextHook";
import Swal from "sweetalert2";
import useGetGroups from "../../hook/useGetGroups";

const CreateGroup = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [topicName, setTopicName] = useState("");
  const { user } = useAuthContextHook();
  const [groupId, setGroupId] = useState("");
  const [refetch, setRefetch] = useState(false);
  const axiosInstace = useAxiosSecureHook();
  const groups = useGetGroups(refetch, user?.email);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!title || !user?.email) {
      Swal.fire({
        title: "Please fill all the fields",
      });
      return;
    }
    const data = {
      title,
      topics: [],
      creator: user?.email,
      creatorName: user?.name,
    };
    console.log("data of group", data);
    try {
      const response = await axiosInstace.post("/groups", data);
      console.log("response of group", response);
      if (response.status === 200) {
        setRefetch(!refetch);
        setTitle("");
        Swal.fire({
          title: "Resource created successfully",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "You can't share resource right now!",
        icon: "error",
      });
    }
  };
  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!topicName || !link || !groupId) {
      Swal.fire({
        title: "Please fill all the fields",
      });
      return;
    }
    const data = {
      id: groupId,
      topicName,
      link,
    };
    console.log("data of topic", data);
    const response = await axiosInstace.post(`/groups/${groupId}`, data);
    if (response.status === 200) {
      Swal.fire({
        title: "Topic added successfully",
        icon: "success",
      });
      setTopicName("");
      setLink("");
    } else {
      Swal.fire({
        title: "Error adding topic",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <h2 className="text-3xl mb-5">Add title</h2>
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resource title"
          className="input input-bordered mr-3"
        />
        <button type="submit" className="btn btn-primary">
          Create Resource
        </button>
      </form>
      <h2 className="text-2xl mb-5 mt-8">Add Topic</h2>
      <form onSubmit={handleAddTopic}>
        <select
          className="select select-bordered mr-3"
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="" disabled selected>
            Select Group
          </option>
          {groups?.map((group) => (
            <option key={group._id} value={group._id}>
              {group.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          placeholder="Topic name"
          className="input input-bordered mr-3"
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Resource link"
          className="input input-bordered mr-3"
        />
        <button type="submit" className="btn btn-primary">
          Add topic
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
