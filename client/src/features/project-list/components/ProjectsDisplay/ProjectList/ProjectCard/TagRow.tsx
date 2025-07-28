import TagBtn from "./TagBtn";

type TagRowProps = {
  tagList: string[];
};

export default function TagRow({ tagList }: TagRowProps) {
  const colSelectors = ["p-0 col d-flex flex-wrap align-items-start"];

  return (
    <div className="mx-0 mt-2 row w-100">
      <div className={colSelectors.join(" ")}>
        {tagList.map((tag, index) => {
          return <TagBtn key={`${tag}-${index}`} tag={tag} />;
        })}
      </div>
    </div>
  );
}
