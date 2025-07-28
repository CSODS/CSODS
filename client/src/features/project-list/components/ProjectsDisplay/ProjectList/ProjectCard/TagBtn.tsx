import { useNavigateWithTag } from "@/hooks";
import { useTagColorMap } from "../hooks";
import { BtnBare } from "@/components";

type TagProps = {
  tag: string;
};

export default function TagBtn({ tag }: TagProps) {
  const tagColorMap = useTagColorMap();
  const iconColor = tagColorMap.get(tag);
  const iconClass = `m-0 p-0 bi bi-circle-fill fs-xxs ${iconColor}`;
  const textOnHover = `hover-${iconColor}`;

  const callbackFn = useNavigateWithTag(tag);

  return (
    <BtnBare
      flex="row"
      justify="center"
      align="center"
      margin={[{ breakpoint: "lg", b: 1 }, { m: 0 }]}
      callBackFn={callbackFn}
    >
      <div className="flex-col p-0 m-0 me-1 d-flex justify-content-center align-items-center fs-xs">
        <i className={iconClass}></i>
      </div>
      <div
        className={`flex-col p-0 pe-2 m-0 text-center text-nowrap fs-xs fst-italic color-light-1 ${textOnHover}`}
      >
        {tag}
      </div>
    </BtnBare>
  );
}
