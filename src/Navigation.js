import React, { useContext, useEffect } from "react";
import ContentIcon from "./assets/content_icon.svg";
import { Popover } from "antd";
import PromoHook from "./Hooks/PromoHook";
import ProductHook from "./Hooks/ProductHook";
import ZonesHook from "./Hooks/ZonesHook";
import LendHook from "./Hooks/LendHook";
import XTHook from "./Hooks/XtHook";
import ShuurhaiJSON from "./Shuurhai.json";
import css from "./navigation.module.css";
import newLogo from "./assets/global/logo-nav.svg";
import Link from "./components/Routing/Link";
import { useState } from "react";
import { GlobalContext } from "./Hooks/GlobalContext";

function Navigation(props) {
	const { loggedUser } = useContext(GlobalContext);
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener("popstate", onLocationChange);

		return () => {
			window.removeEventListener("popstate", onLocationChange);
		};
	}, []);

	const promoctx = useContext(PromoHook);
	const productCtx = useContext(ProductHook);
	const zonesctx = useContext(ZonesHook);
	const lendctx = useContext(LendHook);
	const xtctx = useContext(XTHook);

	const permission = Object.values(JSON.parse(props?.userData?.permission))[0];
	// console.log(props.userData);

	const orderHideCompanyIds = [
		"|13987|",
		"|14006|",
		"|13992|",
		"|13991|",
		"|13994|",
		"|13965|",
		"|13995|",
		"|4805|",
		"|10683|",
		"|1232|",
		"|13990|",
		"|13996|",
		"|13993|",
		"|13997|",
		"|13998|",
		"|14000|",
		"|13999|",
	];

	const shuurkhaiContent = (
		<div key={"navigation-merchant-popover"} style={{ cursor: "pointer" }}>
			<p>
				<Link style={{ color: "inherit" }} href="/shuurkhaiProducts">
					Бүтээгдэхүүн
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/shuurkhaiSupps">
					Нийлүүлэгчид
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/shuurkhaiPickPack">
					Pick Pack
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/shuurkhaiWarehouse">
					Агуулах
				</Link>
			</p>
		</div>
	);

	const merchantContent = (
		<div key={"navigation-merchant-popover"} style={{ cursor: "pointer" }}>
			<p>
				<Link style={{ color: "inherit" }} href="/merchants">
					Харилцагч
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/merchantsID">
					Харилцагчийн хүсэлт
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/accounts">
					Accounts
				</Link>
			</p>
		</div>
	);

	const content = (
		<div key={"nagivation-marketing-popover"} style={{ cursor: "pointer" }}>
			<p>
				<Link style={{ color: "inherit" }} href="/wheel">
					Хүрд
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/holiday">
					Баярын мишээл
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/travel">
					Аялалтай уралдаан
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/banner">
					Баннер
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/highLight">
					Онцлох бүтээгдэхүүн
				</Link>
			</p>
			<p>
				<Link style={{ color: "inherit" }} href="/hightlight-suppliers">
					Онцлох нийлүүлэгч
				</Link>
			</p>
		</div>
	);

	const navigationItems = [
    // {
    //   path: "/zahialga",
    //   title: "Захиалга",
    //   icon: "https://admin.ebazaar.mn/media/order.svg",
    //   show: permission?.order?.read,
    // },
    {
      path: "/sales",
      title: "Борлуулалт",
      icon: "https://admin.ebazaar.mn/media/order.svg",
      show: permission?.order?.read,
    },
    {
      path: "/customer",
      title: "Харилцагч",
      icon: "https://admin.ebazaar.mn/media/order.svg",
      show: permission?.order?.read,
    },
    {
      path: "/sfa_tailan",
      title: "SFA Тайлан",
      icon: "https://admin.ebazaar.mn/media/collection.svg",
      show: props.sfaSupp,
    },
    {
      path: "/orders",
      title: "Захиалга",
      icon: "https://ebazaar.mn/icon/admin/orders.svg",
      show:
        permission?.order.read &&
        !orderHideCompanyIds.includes(props.userData.company_id),
    },
    {
      path: "/orderstwo",
      title: "Захиалга 2.0",
      icon: "https://ebazaar.mn/icon/admin/orders.svg",
      show:
        permission?.order.read &&
        !orderHideCompanyIds.includes(props.userData.company_id),
    },
    {
      path: "/newOrders",
      title: "Шинэ Захиалга",
      icon: "https://ebazaar.mn/icon/admin/orders.svg",
      show: props.userData.id === 994,
    },
    {
      path: "/orderreturn",
      title: "Буцаалтын захиалга",
      icon: "https://admin.ebazaar.mn/media/orderReturn.svg",
      show: permission?.orderreturn?.read,
    },
    {
      path: "/shuurhai",
      title: "Захиалга",
      icon: "https://ebazaar.mn/icon/admin/orders.svg",
      show: ShuurhaiJSON.includes(props.userData.company_id),
    },
    {
      path: "/products",
      title: "Бүтээгдэхүүн",
      icon: "https://ebazaar.mn/icon/admin/package.svg",
      show:
        permission?.product?.read && props.userData.company_id !== "|13954|",
      clickHandler: () => {
        productCtx?.setSettingView(false);
      },
    },
    {
      path: "/buteegdekhuun",
      title: "Бүтээгдэхүүн 2.0",
      icon: "https://ebazaar.mn/icon/admin/package.svg",
      show:
        permission?.product?.read && props.userData.company_id !== "|13954|",
      clickHandler: () => {
        productCtx?.setSettingView(false);
      },
    },
    {
      path: "/merchants",
      title: "Харилцагч",
      icon: "https://admin.ebazaar.mn/media/customers.svg",
      show:
        props.userData.company_id === "|14014|" ||
        props.userData.company_id === "|948|" ||
        props.userData.company_id === "|14061|",
    },
    {
      path: "#",
      show:
        !(
          props.userData.company_id === "|14014|" ||
          props.userData.company_id === "|948|" ||
          props.userData.company_id === "|14061|"
        ) &&
        (props.userData.company_id === "|1|" || permission?.merchant?.read),
      customContent: (
        <Popover
          key={`merchant-navigation`}
          placement="right"
          content={merchantContent}
          trigger="hover	"
        >
          <div
            key={`merchant-navigation`}
            className={
              window.location.pathname === "/merchants"
                ? "nav active"
                : window.location.pathname === "/merchantsID"
                ? "nav active"
                : "nav"
            }
          >
            <div className="navItemWrapper">
              <img
                src="https://admin.ebazaar.mn/media/customers.svg"
                alt="Customer"
                height={30}
              />
              <span>Харилцагч</span>
            </div>
          </div>
        </Popover>
      ),
    },
    {
      path: "/sms",
      title: "SMS",
      icon: "https://admin.ebazaar.mn/media/sms.svg",
      show:
        props.userData.company_id === "|1|" &&
        permission?.sms &&
        permission?.sms?.read,
    },
    {
      path: "/upoint",
      title: "UPoint",
      icon: "https://admin.ebazaar.mn/media/uPoint.svg",
      show: props.userData.company_id === "|1|" && permission?.upoint?.read,
    },
    {
      path: "/xtmar",
      title: "ХТ маршрут",
      icon: "https://admin.ebazaar.mn/media/xtmar.svg",
      show: permission?.xtmar?.read,
      clickHandler: () => {
        xtctx.setPage(0);
        xtctx.setHi(false);
      },
    },
    {
      path: "/suppliers",
      title: "Нийлүүлэгч",
      icon: "https://admin.ebazaar.mn/media/supplier.svg",
      show: permission?.supplier?.read,
    },
    {
      title: "Oresh",
      path: "/oresh",
      icon: "https://ebazaar.mn/icon/admin/package.svg",
      show:
        props.userData.id === 1071 ||
        props.userData.company_id.includes("14057") ||
        props.userData.company_id.includes("14181") ||
        props.userData.company_id.includes("14142"),
    },
    {
      path: "/noat",
      title: "НӨАТ",
      icon: "https://admin.ebazaar.mn/media/noat-target-uramshuulal-pbi.svg",
      show: permission?.noat?.read,
    },
    {
      path: "/discount",
      title: "Промо",
      icon: "https://admin.ebazaar.mn/media/discount.svg",
      show: permission?.discount?.read,
      clickHandler: () => {
        promoctx.setNextPage(false);
        promoctx.setProUpdate(false);
        promoctx.setUpdateDisProd(false);
      },
    },
    {
      path: "/promo",
      title: "Шинэ хямдрал",
      icon: "https://admin.ebazaar.mn/media/sms.svg",
      show: props.userData.id === 351,
    },
    {
      path: "/pickpack",
      title: "Pickpack",
      icon: "https://admin.ebazaar.mn/media/pickpack.png",
      show: props.userData.company_id === "|1|" && permission?.pickpack?.read,
    },
    {
      path: "/zones",
      title: "Бүсчлэл",
      icon: "https://admin.ebazaar.mn/media/zones.svg",
      show: permission?.zones?.read,
      clickHandler: () => {
        zonesctx.setModal(false);
      },
    },
    {
      path: "/analytic",
      title: "Log",
      icon: "https://admin.ebazaar.mn/media/log.svg",
      show: props.userData.company_id === "|1|" && permission?.log?.read,
    },
    {
      path: "/shipment",
      title: "Ачилтын захиалга",
      icon: "https://admin.ebazaar.mn/media/shipment-warehouse.svg",
      show: permission?.shipment?.read && props.userData.company_id !== '|14005|',
    },
    {
      path: "/ship-ment",
      title: "Ачилтын захиалга2",
      icon: "https://admin.ebazaar.mn/media/shipment-warehouse.svg",
      show: permission?.shipment?.read && props.userData.company_id !== '|14005|',
    },
    {
      path: "/borluulalt",
      title: "Борлуулалт",
      icon: "https://admin.ebazaar.mn/media/noat-target-uramshuulal-pbi.svg",
      show: props.userData.company_id === "|13889|",
    },
    {
      path: "/return",
      title: "Буцаалт",
      icon: "https://admin.ebazaar.mn/media/productr.svg",
      show: permission?.return?.read,
    },
    {
      path: "/tdays",
      title: "Түгээлтийн өдөр",
      icon: "https://admin.ebazaar.mn/media/tdays.svg",
      show: permission?.delivery?.read,
    },
    {
      path: "/userAccessControl",
      title: "Эрхийн тохиргоо",
      icon: "https://admin.ebazaar.mn/media/userAccessControl.svg",
      show: permission?.account?.read,
    },
    {
      path: "/newUser",
      title: "Эрхийн тохиргоо",
      icon: "https://admin.ebazaar.mn/media/userAccessControl.svg",
      show: props.userData.id === 994,
    },
    {
      path: "/collected",
      title: "Collection",
      icon: "https://admin.ebazaar.mn/media/collection.svg",
      show: props.userData.company_id === "|1|" && permission?.collection?.read,
    },
    {
      path: "/borluulalt",
      title: "Борлуулалт",
      icon: "https://admin.ebazaar.mn/media/collection.svg",
      show: props.userData.company_id === "|1|" || permission?.borluulalt?.read,
    },
    {
      path: "/warehouse",
      title: "Агуулах",
      icon: "https://admin.ebazaar.mn/media/shipment-warehouse.svg",
      show: permission?.inventory?.read,
    },
    {
      path: "/ware-house",
      title: "Агуулах2",
      icon: "https://admin.ebazaar.mn/media/shipment-warehouse.svg",
      show: permission?.inventory?.read,
    },
    {
      path: "/aguulakh",
      title: "Warehouse",
      icon: "https://admin.ebazaar.mn/media/shipment-warehouse.svg",
      show: permission?.inventory?.read,
    },
    {
      path: "/payrec",
      title: "Өглөг, авлага",
      icon: "https://admin.ebazaar.mn/media/payrec.svg",
      show: permission?.order?.read,
    },
    {
      path: "#",
      customContent: (
        <Popover
          key={`navigation-marketing`}
          placement="right"
          content={content}
          trigger="hover	"
        >
          <div
            key={`navigation-marketing`}
            className={
              window.location.pathname === "/wheel"
                ? "nav active"
                : window.location.pathname === "/holiday"
                ? "nav active"
                : window.location.pathname === "/travel"
                ? "nav active"
                : window.location.pathname === "/banner"
                ? "nav active"
                : window.location.pathname === "/highLight"
                ? "nav active"
                : window.location.pathname === "/hightlight-suppliers"
                ? "nav active"
                : "nav"
            }
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="navItemWrapper">
              <img
                src={"https://admin.ebazaar.mn/media/marketing.svg"}
                height={30}
                alt="Marketing"
              />
              <span>Маркетинг</span>
            </div>
          </div>
        </Popover>
      ),
      show: props.userData.company_id === "|1|",
    },
    {
      path: "/specialPermit",
      title: "Харилцагчийн медиа",
      icon: "https://admin.ebazaar.mn/media/specialPermit.svg",
      show:
        props.userData.company_id === "|1|" && permission?.tradeshopfiles?.read,
    },
    {
      path: "/target",
      title: "Төлөвлөгөө",
      icon: "https://admin.ebazaar.mn/media/noat-target-uramshuulal-pbi.svg",
      show: permission?.tradeshopfiles?.read,
    },
    {
      path: "/lend",
      title: "Зээлийн тохиргоо",
      icon: "https://admin.ebazaar.mn/media/lend.svg",
      show: permission?.lend?.read,
      clickHandler: () => {
        lendctx.setLendState(false);
      },
    },
    {
      path: "/report",
      title: "Нийлүүлэгч нарийвчилсан бүртгэл",
      icon: "https://admin.ebazaar.mn/media/report.svg",
      show: permission?.report?.read,
      click: () => {
        lendctx.setLendState(false);
      },
    },
    {
      path: "/vat",
      title: "VAT",
      icon: ContentIcon,
      show:
        props.userData.id === 351 ||
        props.userData.id === 980 ||
        props.userData.id === 994,
      clickHandler: () => {
        lendctx.setLendState(false);
      },
    },
    {
      path: "/borluulaltiinuramshuulal",
      title: "Борлуулалтын урамшуулал",
      icon: "https://admin.ebazaar.mn/media/noat-target-uramshuulal-pbi.svg",
      show: permission?.borluulaltiinuramshuulal?.read,
    },
    {
      path: "/pbi",
      title: "Power BI тайлан",
      icon: "https://admin.ebazaar.mn/media/noat-target-uramshuulal-pbi.svg",
      show: permission?.pbi?.read,
    },
    {
      path: "/shuurkhai",
      title: "Шуурхай түгээлт",
      show: props.userData.company_id === "|1|",
      icon: "https://ebazaar.mn/icon/admin/orders.svg",
    },
  ];


  return (
    <div
      id="navigation"
      className={
        (props.userData.id === 351 ||
          props.userData.id === 980 ||
          props.userData.id === 994) &&
        css.navigation
      }
    >
      <Link href="/" className={css.logoWrapper}>
        <img src={newLogo} alt="Logo" />
      </Link>

      {navigationItems.map((item, index) => {
        return (
          <>
            {item.show ? (
              <>
                {item.customContent ? (
                  item.customContent
                ) : (
                  <Link
                    key={`navigation-item-${index}`}
                    clickHandler={() => {
                      item.clickHandler && item.clickHandler();
                    }}
                    className={
                      currentPath.includes(item.path) ? "nav active" : "nav"
                    }
                    href={item.path}
                  >
                    <div className="navItemWrapper">
                      <img src={item.icon} alt={item.title} />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )}
              </>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

export default Navigation;
