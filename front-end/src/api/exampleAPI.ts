import * as ExampleAPI from "@/service/exampleAPI";
export const getData = async () => {
  const response = await ExampleAPI.getPosts("posts", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};

export const createData = async (data: object) => {
  const response = await ExampleAPI.createPosts("posts", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};

export const updateData = async (data: object) => {
  const response = await ExampleAPI.updatePosts("posts", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};
export const deleteData = async (data: object) => {
  const response = await ExampleAPI.deletePosts("posts", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};
export const getDataById = async (id: number) => {
  const response = await ExampleAPI.getPostById("posts", id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};
export const getDataByIdBody = async (id: number) => {
  const response = await ExampleAPI.getPostByIdBody("posts", id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};
