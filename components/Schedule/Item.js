import { format } from "date-fns";
import styles from "../../styles/ScheduleItem.module.css";
import { useEffect, useState } from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Separator from "../Separator";
import useAuth from "../../hooks/useAuth";
import { CONTENTFUL_NULL_FIELD } from "../../lib/constants";

const scheduleRequest = (slug, method) =>
  fetch("/api/schedule-register", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });

export default function ScheduleItem({
  item,
  attendees,
  registration = null,
  mutate,
}) {
  const [seeMore, setSeeMore] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    if (attendees) {
      setIsRegistered(
        registration && attendees && attendees.includes(registration.email)
      );
    }
  }, [attendees]);
  const time = new Date(item.time);
  let timeEnd = time;
  if (item.timeEnd) {
    timeEnd = new Date(item.timeEnd);
  }
  const register = () => {
    scheduleRequest(item.slug, "put").then(() => {
      mutate("/api/get-schedule");
    });
  };

  const remove = () => {
    scheduleRequest(item.slug, "delete").then(() => {
      mutate("/api/get-schedule");
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 640) {
        setSeeMore(true);
      }
    }
  }, []);
  // console.log(attendees);
  // const isRegistered =
  //   registration && attendees && attendees.includes(registration.email);
  // const options = {
  //   renderMark: {
  //     [MARKS.BOLD]: (text) => `<custom-bold>${text}<custom-bold>`,
  //   },
  //   renderNode: {
  //     [BLOCKS.PARAGRAPH]: (node, next) =>
  //       `<custom-paragraph>${next(node.content)}</custom-paragraph>`,
  //   },
  // };
  const itemDesc = item.desc.content[0].content[0].value;
  const desc = itemDesc.length > 100 ? itemDesc.slice(0, 100) : itemDesc;
  // const desc = item.desc.slice(0, 5);
  return (
    // <Link href={`/schedule/${item.slug}`}>
    <div style={{ background: isRegistered ? "" : "", marginBottom: 20 }}>
      <div>
        <div className={styles.title}>
          {item.title}{" "}
          {isRegistered ? (
            <span className="littleText">(You are attending this)</span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.time}>
          {format(time, "h:mmaaaaa'm'")} - {format(timeEnd, "h:mmaaaaa'm'")}
        </div>

        {desc !== CONTENTFUL_NULL_FIELD && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: !seeMore
                ? `<p>${desc}...</p>`
                : documentToHtmlString(item.desc),
            }}
          ></div>
        )}
        {desc !== CONTENTFUL_NULL_FIELD && (
          <button className="linkButton" onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? "See less" : "See more info"}
          </button>
        )}
        <div style={{ marginTop: 20 }}>
          {registration && !isRegistered && (
            <button className="smallButton" onClick={register}>
              I will attend!
            </button>
          )}
          {isRegistered && (
            <button
              className="smallButton"
              style={{ background: "red" }}
              onClick={remove}
            >
              I won't attend this one
            </button>
          )}
        </div>
      </div>
      <Separator />
    </div>
    // </Link>
  );
}
