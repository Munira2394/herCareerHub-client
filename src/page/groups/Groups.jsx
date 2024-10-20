import useGetGroups from "../../hook/useGetGroups";

const Groups = () => {
  const groups = useGetGroups();
  console.log("creator name", groups);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {groups?.map((group) => (
          <div className="bg-blue-100 rounded-md p-4 m-4" key={group?._id}>
            <h2 className="text-3xl font-bold">{group?.title}</h2>
            <p className="text-lg">Shared by : {group?.creatorName}</p>
            <div>
              {group?.topics?.map((topic, idx) => (
                <div className="bg-blue-400 rounded-md p-4 m-4" key={idx}>
                  <p>{topic?.topicName}</p>

                  <a
                    className="underline color-blue-800"
                    href={
                      topic?.link.includes("http")
                        ? topic?.link
                        : `https://${topic?.link}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resource Link
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
