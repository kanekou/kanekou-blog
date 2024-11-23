import getFavicon from "../../../lib/getFavicon";
import getMetaData from "../../../lib/getMetaData";
import LinkCardError from "./link-card-error";

type LinkCardInnerProps = {
  href: string;
};

const LinkCardInner = async ({
  href,
}: LinkCardInnerProps): Promise<JSX.Element> => {
  const meta = await getMetaData(href);
  if (!meta) {
    return <LinkCardError href={href} />;
  }
  const url = new URL(href);
  return (
    <a
      href={href}
      className="flex bg-white border border-gray-200 rounded-lg shadow no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <div className="justify-between p-4 leading-normal overflow-hidden">
        <div className="text-lg font-bold tracking-tight text-gray-900 line-clamp-2">
          {meta.title}
        </div>
        <div className="truncate font-normal text-gray-700">
          {meta.description}
        </div>
        <div className="text-[0.78em] flex -mt-2 items-center overflow-hidden whitespace-nowrap">
          <img
            className="w-4 h-4"
            src={getFavicon(url.hostname)}
            alt={meta.title}
          />
          <span className="text-gray-700 ml-1">{url.hostname}</span>
        </div>
      </div>
      {meta.image && (
        <img
          className="object-cover h-full w-48"
          src={meta.image}
          alt={meta.title}
        />
      )}
    </a>
  );
};

export default LinkCardInner;
