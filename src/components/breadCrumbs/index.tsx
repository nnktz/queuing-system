import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BreadcrumbContainer = (props: any) => {
  const items = useSelector((state: any) => state.breadcrumb.items);

  const breadcrumbItems = items.map((item: any, index: number) => {
    const isLastItem = index === items.length - 1;
    return {
      title: (
        <Link to={item.link} className={isLastItem ? "last-breadcrumb" : ""}>
          {item.title}
        </Link>
      ),
    };
  });

  return (
    <Breadcrumb
      separator=">"
      items={breadcrumbItems}
      className={props.className}
    />
  );
};

export default BreadcrumbContainer;
