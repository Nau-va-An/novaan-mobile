import PostApi from "@/api/post/PostApi";

const getResourceUrl = async (id: string): Promise<string | null> => {
    const response = await PostApi.getResource(id);
    if (!response.success) {
        return null;
    }

    return response.value.url;
};

export default {
    getResourceUrl,
};
