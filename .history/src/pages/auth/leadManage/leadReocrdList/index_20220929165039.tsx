import React, { useState, useRef } from "react";
import {
  Table,
  Button,
  Divider,
  message,
  PaginationProps,
  Input,
  Select,
  InputRef,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetLeadRecordAll,
  useChangeLead,
  useConcelLead,
  useLongLead,
} from "./util";
import { bookLeadRecord } from "../../../../type/type";

const { Option } = Select;
export default function Index() {
  const navigate = useNavigate();

  // 分页
  const [page, setPage] = useState(0);
  // 搜索
  const [keyword, setKeyword] = useState<string | undefined>("");
  // 绑定搜索框
  const InputRef = useRef<InputRef>(null);
  // 搜素类型
  const [type, setType] = useState("0");
  // 搜素类型
  const [currentType, setCurrentType] = useState("0");
  // 书籍状态
  const [state, setState] = useState(-1);
  // 获取图书
  const { isLoading, data } = useGetLeadRecordAll(page, state, keyword, type);
  // 延长借阅所选时间
  const [longer, setLonger] = useState("0");
  // 取走或归还图书
  const { mutateAsync: changeBookLead } = useChangeLead([
    "leadmanage",
    "leadrecordlist",
    page,
    state,
    keyword,
    type,
  ]);
  const changeLeadRecord = (value: bookLeadRecord) => {
    if (value.state == 0) value.state = 1;
    else if (value.state == 1) value.state = 2;
    changeBookLead(value).then((res) => {
      if (res.status == 0) {
        message.success("操作成功");
      }
    });
  };
  // 取消借阅
  const { mutateAsync: concelLead } = useConcelLead([
    "leadmanage",
    "leadrecordlist",
    page,
    state,
    keyword,
    type,
  ]);
  const concelLeadFunc = (value: bookLeadRecord) => {
    value.state = 2;
    concelLead(value).then((res) => {
      if (res.status == 0) {
        message.success("已取消该书籍借阅记录");
      }
    });
  };
  // 延长借阅
  const { mutateAsync: longLead } = useLongLead([
    "leadmanage",
    "leadrecordlist",
    page,
    state,
    keyword,
    type,
  ]);
  const confirmLonger = (value: bookLeadRecord) => {
    // value中的借阅时间需要修改
    let data = { ...value, extension: longer };
    longLead(data).then((res) => {
      if (res.status == 0) {
        message.success("延长书籍借阅时间成功");
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="type-button">
          <div className="title" style={{ width: "5rem" }}>
            查找
          </div>
          <Input.Group className="group" compact>
            <Select defaultValue={type} onChange={(e) => setCurrentType(e)}>
              <Option value="0">书名</Option>
              <Option value="1">姓名</Option>
              <Option value="2">手机号</Option>
            </Select>
            <Input
              ref={InputRef}
              onPressEnter={(e) => {
                setKeyword(e.target.value);
                setPage(0);
                setType(currentType);
              }}
              style={{ width: "45%", height: "2rem" }}
            />
            <img
              onClick={() => {
                setKeyword(InputRef?.current?.input?.value);
                setPage(0);
                setType(currentType);
              }}
              src={require("../../../../assets/search.png")}
              alt="搜索"
            ></img>
          </Input.Group>
          <Button
            type={state == -1 ? "primary" : "default"}
            onClick={() => {
              setState(-1);
              setPage(0);
            }}
          >
            所有
          </Button>
          <Button
            type={state == 0 ? "primary" : "default"}
            onClick={() => {
              setState(0);
              setPage(0);
            }}
          >
            待取书
          </Button>
          <Button
            type={state == 1 ? "primary" : "default"}
            onClick={() => {
              setState(1);
              setPage(0);
            }}
          >
            已借阅
          </Button>
          <Button
            type={state == 2 ? "primary" : "default"}
            onClick={() => {
              setState(2);
              setPage(0);
            }}
          >
            已逾期
          </Button>
        </div>
        <Button
          size="small"
          type="primary"
          onClick={() => navigate("/leadmanage/leadmanage2")}
        >
          快捷借阅书籍
        </Button>
      </div>

      <Divider style={{ marginTop: "0rem" }}></Divider>
      <Table
        loading={isLoading}
        pagination={data?.pagination}
        size="small"
        rowKey={"borrow_id"}
        columns={[
          {
            title: "借阅记录ID",
            align: "center",
            dataIndex: "borrow_id",
          },
          {
            title: "借阅会员",
            dataIndex: "user_name",
            align: "center",
          },
          {
            title: "会员手机",
            dataIndex: "phone",
            align: "center",
          },
          {
            title: "借阅书籍",
            dataIndex: "title",
            align: "center",
          },
          {
            title: "借阅时间",
            dataIndex: "borrow_date",
            align: "center",
          },
          {
            title: "书籍状态",
            align: "center",
            render(value: bookLeadRecord) {
              return (
                <span>
                  {value.state
                    ? value.state == "1"
                      ? "已完成"
                      : value.state == "2"
                      ? "已取消"
                      : "已逾期"
                    : "待取书"}
                </span>
              );
            },
          },
          {
            title: "操作",
            align: "center",
            render(value: bookLeadRecord) {
              if (value.state == 0)
                return (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title={"是否确认取走图书"}
                      onConfirm={() => changeLeadRecord(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="link">取走图书</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title={"是否确认取走图书"}
                      onConfirm={() => concelLeadFunc(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="link" danger>
                        取消借阅
                      </Button>
                    </Popconfirm>
                  </>
                );
              else if (value.state == 1)
                return (
                  <>
                    <Popconfirm
                      placement="topRight"
                      title={"是否确认归还图书"}
                      onConfirm={() => changeLeadRecord(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="link">归还图书</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title={
                        <div>
                          <span>确认要延长借阅所选图书吗?</span>
                          <div>
                            <Button
                              type={longer == "1" ? "primary" : "default"}
                              style={{ margin: "1rem 0.5rem" }}
                              onClick={() => setLonger("1")}
                            >
                              1周
                            </Button>
                            <Button
                              type={longer == "2" ? "primary" : "default"}
                              style={{ margin: "1rem 0.5rem" }}
                              onClick={() => setLonger("2")}
                            >
                              2周
                            </Button>
                            <Button
                              type={longer == "3" ? "primary" : "default"}
                              style={{ margin: "1rem 0.5rem" }}
                              onClick={() => setLonger("3")}
                            >
                              3周
                            </Button>
                            <Button
                              type={longer == "4" ? "primary" : "default"}
                              style={{ margin: "1rem 0.5rem" }}
                              onClick={() => setLonger("4")}
                            >
                              4周
                            </Button>
                          </div>
                        </div>
                      }
                      onConfirm={() => confirmLonger(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="link" danger>
                        延长借阅
                      </Button>
                    </Popconfirm>
                  </>
                );
              else return <span>已完成</span>;
            },
          },
        ]}
        dataSource={data?.data}
        onChange={(v: PaginationProps) => {
          setPage((v.current as number) - 1);
        }}
      />
    </>
  );
}
