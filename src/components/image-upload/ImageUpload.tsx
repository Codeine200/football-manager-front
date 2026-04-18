import styles from "./ImageUpload.module.css";
import imageUpload from "@/assets/images/image-upload.svg";
import {useId, useState} from "react";

type Props = {
    onChange: (file: File | null) => void;
};

export const ImageUpload = ({ onChange }: Props) => {
    const [imageName, setImageName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputId = useId();

    return (
      <>
          <div className={styles.container}>
              <div>
                  <input
                      id={inputId}
                      className={styles.input}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                              setImageName(file.name);
                              const url = URL.createObjectURL(file);
                              setPreview(url);
                              onChange(file);
                          }
                          e.target.value = "";
                      }}
                  />
                  <label htmlFor={inputId}>
                      <img src={imageUpload} alt="Upload" className={styles.icon}/>
                  </label>
              </div>

              {imageName && preview && (
                  <>
                      <div className={styles.imageContainer}>
                          <img src={preview} alt="Preview" className={styles.preview}/>
                      </div>

                      <div className={styles.imageName}>
                          {imageName}
                      </div>

                      <button
                          title="Remove team logo"
                          className={`${styles.removeImage} ${styles.actionButton}`}
                          onClick={(e) => {
                                  setImageName(null);
                                  setPreview(null);
                                  onChange(null);
                              }
                          }
                      ></button>
                  </>
              )}

              {!imageName &&
                  <div className={styles.title}>Upload image</div>
              }
          </div>
      </>
    );
}