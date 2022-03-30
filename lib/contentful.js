import * as contentful from "contentful";
import { toTitleCase } from "./utils";

class Contentful {
  client;
  contentTypes = {
    scheduleEntry: "scheduleEntry",
    speaker: "speaker",
  };

  constructor() {
    this.client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  getAllScheduleEntries() {
    return this.client
      .getEntries({ content_type: this.contentTypes.scheduleEntry })
      .then((entry) => {
        return entry.items
          .map((entry) => {
            const { title, time, timeEnd, desc, slug } = entry.fields;
            return { title, time, timeEnd, desc, slug };
          })
          .sort((a, b) => new Date(a.time) - new Date(b.time));
      });
  }

  getScheduleEntryBySlug(slug) {
    return this.client
      .getEntries({
        content_type: this.contentTypes.scheduleEntry,
        "fields.slug": slug,
      })
      .then((entry) => {
        return entry.items
          .map((entry) => {
            const { title, time, desc, slug } = entry.fields;
            return { title, time, desc, slug };
          })
          .sort((a, b) => new Date(a.time) - new Date(b.time));
      });
  }

  getAllSpeakers() {
    return this.client
      .getEntries({ content_type: this.contentTypes.speaker })
      .then((entry) => {
        return entry.items.map((entry) => {
          console.log(entry, "speaker");
          const {
            name,
            photo: {
              fields: {
                file: { url },
              },
            },
            jobTitle,
            description,
          } = entry.fields;
          return { name, photoUrl: url, jobTitle, description };
        });
      });
  }

  getSpeakerBySlug(slug) {
    return this.client
      .getEntries({
        content_type: this.contentTypes.speaker,
        "fields.slug": slug,
      })
      .then((entry) => {
        return entry.items.map((entry) => {
          const {
            name,
            photo: {
              fields: {
                file: { url },
              },
            },
            jobTitle,
            description,
          } = entry.fields;
          return { name, photoUrl: url, jobTitle, description };
        });
      });
  }

  getSpeakerByName(name) {
    const titleCaseName = toTitleCase(name.split("-").join(" "));
    return this.client
      .getEntries({
        content_type: this.contentTypes.speaker,
        "fields.name": titleCaseName,
      })
      .then((entry) => {
        return entry.items.map((entry) => {
          const {
            name,
            photo: {
              fields: {
                file: { url },
              },
            },
            jobTitle,
            description,
          } = entry.fields;
          return { name, photoUrl: url, jobTitle, description };
        });
      });
  }
}

export default Contentful;
