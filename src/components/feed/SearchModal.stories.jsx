import * as React from "react";
import SearchModal from "./SearchModal";

const ALL = [
  { id: 69, username: "@Ava-Monroe", name: "Ava Monroe" },
  { id: 84, username: "@Anthony-Savage", name: "Anthony Savage" },
  { id: 71, username: "@Cynthia-Zuniga", name: "Cynthia Zuniga" },
  { id: 85, username: "@Nova-Lane", name: "Nova Lane" },
];

export default {
  title: "Feed/SearchModal",
  component: SearchModal,
  tags: ["autodocs"],
  argTypes: { onClose: { action: "close" }, onResultClick: { action: "result" } },
};

/** Interactive: filters the mock dataset as you type. */
export const Interactive = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [q, setQ] = React.useState("");
    const results = q.trim()
      ? ALL.filter((u) => (u.name + u.username).toLowerCase().includes(q.trim().toLowerCase()))
      : [];
    return (
      <>
        <button onClick={() => setOpen(true)}>Open search</button>
        <SearchModal
          open={open}
          onClose={() => setOpen(false)}
          query={q}
          onQueryChange={setQ}
          results={results}
        />
      </>
    );
  },
};

export const Empty = {
  args: { open: true, query: "zzz", results: [] },
};

export const Loading = {
  args: { open: true, query: "ava", loading: true },
};
