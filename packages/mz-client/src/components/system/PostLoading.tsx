import styles from "@/styles/gooLoader.module.scss";

export default function Loading() {
  return <LoadingSkeleton />;
}

function LoadingSkeleton() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.blobs}>
        <div className={styles.blob_center}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
        <div className={styles.blob}></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
