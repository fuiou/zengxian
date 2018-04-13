<template>
	<div id="content">
		<div v-if="!isWeiXin" class="header">
			安全条款
			<img @click.stop="back" class="back" src="./back.png" alt="">
		</div>
		<div v-if="!isWeiXin" class="padding225"></div>
		<!-- 条例们 -->
		<div class="clause_wrapper clearfix">
			<div class="clause">
				为维护您自身权益，建议您仔细阅读各条款具体表述。<br/>
				【审慎阅读】您在申请注册流程中同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容。
			</div>
			<div class="clause">
				当您在本公司的推广页面中自主填写了您的个人需求及信息后，即视为您同意本公司将您的信息提供与本公司合作的保险产品方，我们将根据您的财务需要向您推送符合您需求的寿险产品，并安排寿险产品专业服务人员为您提供专业咨询类服务，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。 为了向您提供更优质的客户服务和产品，本公司将通过本网站收集您的部分信息。为了使您提供的所有信息都能得到机密保障，本公司采用下述关于信息保护的政策：
			</div>
			<div class="clause">
				1.投保对象：本保险的保险对象为27-45周岁身体健康、能正常工作或正常生活的自然人<br/>			
				2.保险期限：以被保险人收到短信通知上的保险起止日期为准。对保险日期之外所发生的保障事故保险公司不负责给付保险责任
			</div>
			<div class="clause">
				3.使用条款：详情内容请登录保险公司官网网站查询
			</div>
			<div class="clause">
				4.告知义务：依我国《保险法》的规定，投保人、被保险人应如实告知，否则保险人有权依法解除保险合同，并对于保险合同解除前发生的保险事故不负任何责任。 投保人、被保险人在投保时，应对投保书内各项内容如实详细的说明或填写清楚。否则，保险人有权依法解除保险合同。<br/>
				5.保险判定流程：根据用户所填写的资料后台自动匹配最适合用户的保险为期进行投保,具体产品情况以申请时的政策为准。
			</div>
			<div class="clause">
				6.保险提供商：相关保险由中国平安、太平人寿、百年人寿、阳光人寿、中美大都会人寿提供，参与本活动即表示本人已知晓并许可中国平安客服(通过95511专线)、太平人寿（通过95589专线）、阳光人寿客服(通过95510专线)、百年人寿客服（通过95542）、中美大都会人寿（通过95308专线）致电沟通赠险领取事宜。<br/>
				7.保险凭证：险公司对保险仅提供电子保单；赠送保险每人只能投保一份，重复或投保多分无效。<br/>
				8.如对赠险内容及理赔有疑问请拨打相关保险公司客服电话进行咨询				
			</div>
			<div class="clause red">
				重要告知与声明
				本人授权保险公司，除法律另有规定之外，将本人提供给保险公司的信息、享受保险公司服务产生的信息（包括本〔单证〕签署之前提供和产生的信息）以及保险公司根据本条约定查询、收集的信息，用于保险公司及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。<br/>
				本人授权保险公司，除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向保险公司因服务必要开展合作的伙伴提供、查询、收集本人的信息。为确保本人信息的安全，保险公司及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。
			</div>
			<div class="clause red">
				本条款自本〔单证〕签署时生效，具有独立法律效力 , 不受合同成立与否及效力状态变化的影响。
			</div>
		</div>
	</div>
</template>
<script>
	import {isWeiXin} from '../../assets/js/public';
	export default{
		data(){
			return{
				isWeiXin:false //判断是不是微信浏览器 
			}
		},
		methods:{
			back(){//返回上一页
				this.$router.back(-1)
			}
		},
		created(){
			if(isWeiXin()){
				this.isWeiXin = true;
			}
			window.scrollTo(0,0);
		}
	}
</script>
<style scoped lang="less">
	#content{
		position:relative;
		width:100%;
		height:100%;
		background:url('./background_square.png');
		background-size:6px 6px;
		.padding225{
			width:100%;
			height:2.25rem;
		}
		.header{
			position:fixed;
			left:0;
			top:0;
			width:100%;
			height:2.25rem;
			line-height:2.25rem;
			font-size:.85rem;
			color:#000;
			text-align:center;
			background:#f0f0f0;
			img.back{
				position:absolute;
				left:.5rem;
				top:.65rem;
				width:.5rem;
				height:.85rem;
			}
		}
		.clause_wrapper{
			margin:0 auto;
			padding-top:.5rem;
			width:16.75rem;
			.clause{
				padding-bottom:.75rem;
				font-size:.6rem;
				line-height:.75rem;
				color:#000;
				text-align:left;
				&.red{
					color:#ff0707;
				}
			}
		}
	}
</style>