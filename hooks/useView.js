// default
let defaultView = "2";
export default function useView(views, step) {
  let currentView;
  if (step) {
    currentView = step[0];
  } else {
    currentView = defaultView;
  }
  const viewReducer = (pv, cv) => {
    const key = cv;
    const isVisible = views[key] === currentView;
    return { ...pv, [cv]: isVisible };
  };
  const view = Object.keys(views).reduce(viewReducer, {});
  return view;
}
