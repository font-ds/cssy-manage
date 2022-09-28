import { Breadcrumb, Button, Col, Row } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { breadcrumbRouterNameMap } from "./router";
const Bread = () => {
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {index > 0 ? (
          <Link style={{fontSize:'1rem'}} to={url}>{breadcrumbRouterNameMap[url]}</Link>
        ) : (
          <>{breadcrumbRouterNameMap[url]}</>
        )}
      </Breadcrumb.Item>
    );
  });
  let breadcrumbItems: any = [];
  //如果不存在一级路由的话
  if (
    !extraBreadcrumbItems.length ||
    extraBreadcrumbItems[0].key === "changePwd"
  ) {
    breadcrumbItems = [
      <Breadcrumb.Item key='home'>
        <Link style={{fontSize:'1rem'}} to='/'>首页</Link>
      </Breadcrumb.Item>,
      ...extraBreadcrumbItems,
    ];
  } else {
    breadcrumbItems = extraBreadcrumbItems;
  }
  const path = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const historyBack = () => {
    const fatherPath = path.slice(0, path.length - 1).join("/");
    navigate(fatherPath);
  };
  //如果其父path为数组里元素，或者路由等级小于三级，则该页不显示回退按钮
  const disAppearPath = ["/deliver/order"];
  const disAppearPathSet = new Set(disAppearPath);
  const showHistoryBack = () => {
    const fatherPath = path.slice(0, path.length - 1).join("/");
    if (disAppearPathSet.has(fatherPath)) return false;
    if (breadcrumbItems.length <= 2) return false;
    return true;
  };
  return (
    <Row align='middle' justify='space-between' style={{marginBottom:'1rem'}}>
      <Col>
        <Breadcrumb  style={{fontSize:'1rem'}} separator='/'>{breadcrumbItems}</Breadcrumb>
      </Col>
      {showHistoryBack() && (
        <Col>
          <Button type='link' onClick={historyBack}>
            返回上一级
          </Button>
        </Col>
      )}
    </Row>
  );
};
export default Bread;
