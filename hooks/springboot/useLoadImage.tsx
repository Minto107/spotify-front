"use client"

const useLoadImage = (id: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/songs/songArt/${id}`;
  return apiUrl;
}

export default useLoadImage