import { createId } from "@paralleldrive/cuid2";
import slugify from "slugify";

export const fileService = {
  save: async (id: string, folder: string, images: Blob | Blob[]) => {
    const imagesArray = Array.isArray(images) ? images : [images];

    for (const image of images as Blob[]) {
      const fileName = slugify(image.name, { lower: true, replacement: "-" });
      await Bun.write(`./public/images/${folder}/${id}/${fileName}`, image);
    }
  },

  extractNames: (images: Blob | Blob[]) => {
    const imagesName = [];
    const imagesArray = Array.isArray(images) ? images : [images];

    for (const image of imagesArray as Blob[]) {
      const fileName = slugify(image.name, { lower: true, replacement: "-" });
      imagesName.push(fileName);
    }

    return imagesName;
  },
};
