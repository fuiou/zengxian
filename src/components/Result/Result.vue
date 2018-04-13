<template>
	<div id="content">
		<div v-if="!isWeiXin" class="header">
			申请详情
			<img @click.stop="back" class="back" src="./back.png" alt="">
		</div>
		<div v-if="!isWeiXin" class="padding225"></div>
		<!-- 申请成功 -->
		<div v-if="applySuccess" class="result_success">
			<div class="result_head">
				<img src="./success.png" alt="">
				<span>提交成功!</span>
				<p>您已申请<span>{{bxName+bxType}}</span>一份，稍后将有客服人员与您联系，协助办理保险事宜。</p>
			</div>
			<div class="cont clearfix">
				<div class="cont_head">
					<p>赠险内容：{{bxType}}<span></span></p>
					<p>保障期限：{{bxDate}}<span></span></p>
				</div>
				<table v-show="showTable" class="table" border="1" cellspacing="0">
					<tr class="table_head">
						<td style="text-align:center;">保险内容</td>
						<td>最高保额</td>
					</tr>
					<tr v-for="item in article">
						<td>{{item.content}}</td>
						<td>{{item.amount}}</td>
					</tr>
				</table>
				<div @click="toIndex" class="sure">确认</div>
			</div>
		</div>
		<!-- 申请失败 -->
		<div v-if="applyFail" class="result_fail clearfix">
			<div class="fail_img_wrapper">
				<img class="fail_img" src="./result_fail.png" alt="">
			</div>
			<span>申请失败</span>
			<p>很抱歉,您可能不符合赠险的申请条件,您可以尝试为您的家人进行申请,谢谢。</p>
			<div @click="toIndex" class="fail_btn">为家人申请一份</div>
		</div>
		<!-- 加载 -->
		<div v-show="false" class="loading_wrapper">
			<div class="loading">
				<img src="./loading.gif" alt="">
			</div>
		</div>
		<!-- 弹框 -->
		<div v-show="showModalFlag" @click="closeModal" @touchmove.prevent class="modal_wrapper">
			<div @click.stop class="modal clearfix">
				<div class="modal_title">
					<span>温馨提示</span>
					<img @click.stop="closeModal" src="./close.png" alt="">
				</div>
				<div class="modal_cont">
					{{modalText}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { ajaxAsync,updateTitle,isWeiXin} from '../../assets/js/public';
  	import { Bejson } from '../../assets/js/xmltojson';
	export default{
		data(){
			return{
				bxName:'',//申请成功的保险名称
				bxDate:'',//申请成功的保险期限
				bxType:'',//申请成功的保险类型
				article:[],//保险列表
				applySuccess:false,//申请成功
				applyFail:false,//申请失败
				name:'',//申保人姓名
				phone:'',//申保人手机号
				type:'',//申保人填写的问卷调查结果
				showLoadingFlag:false,//是否显示Loading
				showModalFlag:false,//是否显示对话框
				modalText:'',//提示框内容
				isWeiXin:false,//判断是不是微信浏览器 
			}
		},
		computed:{
			showTable(){
				return this.article.length>0?true:false;
			}
		},
		methods:{
			back(){//返回上一页
				this.$router.back(-1);
			},
			toIndex(){
				this.$router.push({path:'/index'});
			},
			completeQuestion(){
				var _this = this;
	        	var params = '<INF><transNo>0</transNo><action>insureApply</action><loanFlag>1</loanFlag><userName>'+this.name+'</userName><loanMobile>'+this.phone+'</loanMobile><cxType>'+this.type[0]+'</cxType><favor>'+this.type[1]+'</favor><insure>'+this.type[2]+'</insure></INF>';
	        	console.log("param:",params)
		        ajaxAsync({
		        	obj:_this,
		          	params:params,
		          	success:function(data){
		          		console.log("xmlData:",data);
		            	var xmlobj = Bejson.loadXml(data);
		            	var  data = Bejson.xmltojson(xmlobj);
		            	console.log("提交问卷:",data);
		            	if(data.INF.rcd == '0000'){
		            		_this.bxName = data.INF.brandName;
							_this.bxDate = data.INF.bxExpire;
							_this.bxType = data.INF.bxtypeName;
							_this.article = JSON.parse(data.INF.bxArticle);
							_this.applyFail = false;
							_this.applySuccess = true;
		            	}else{
		            		_this.applySuccess = false;
		            		_this.applyFail = true;
		            		_this.showModal(data.INF.rDesc);
		            	}
		          	},
		          	complete(){
		          		//_this.closeQuestion();
		          	}
		        });
			},
			showModal(text){//显示对话框
				this.modalText = text;
				this.showModalFlag = true;
			},
			closeModal(){//关闭对话框
				this.showModalFlag = false;
			}
		},
		created(){
			if(isWeiXin()){
				this.isWeiXin = true;
			}
			var _name = this.$route.query.name?decodeURIComponent(this.$route.query.name):'';
			var _phone = this.$route.query.phone?decodeURIComponent(this.$route.query.phone):'';
			var _type = this.$route.query.type?decodeURIComponent(this.$route.query.type).split(','):'';
			if(_name&&_phone&&_type){
				this.name = _name;
				this.phone = _phone;
				this.type = _type;
				this.completeQuestion();
			}else{
				this.$router.back(-1);
			}
		}
	}
</script>
<style scoped lang="less">
	#content{
		position:relative;
		width:100%;
		height:100%;
		.loading_wrapper{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			background:rgba(0,0,0,0);
			.loading{
				margin:15rem auto 0;
				width:4rem;
				height:4rem;
				background:rgba(0,0,0,.7);
				img{
					margin:1rem auto 0;
					width:2rem;
					height:2rem;
				}
			}
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
			z-index:1000;
			img.back{
				position:absolute;
				left:.5rem;
				top:.65rem;
				width:.5rem;
				height:.85rem;
			}
		}
		.padding225{
			width:100%;
			height:2.25rem;
		}
		.result_success{
			.result_head{
				img{
					width:2rem;
					height:2rem;
					margin:2.25rem auto 0;
				}
				&>span{
					float:left;
					width:100%;
					height:2.2rem;
					line-height:2.2rem;
					color:#ff4343;
					font-size:.95rem;
				}
				p{
					margin:.75rem;
					width:90%;
					line-height:1rem;
					font-size:.75rem;
					color:#292928;
					text-align:left;
					span{
						color:#ff4343;
					}
				}
			}
			.cont{
				padding-top:.5rem;
				margin:.75rem auto 0;
				width:90%;
				background:#f2f2f2;
				p{
					width:100%;
					height:1rem;
					line-height:1rem;
					font-size:.7rem;
					color:#292928;
					text-align:left;
					text-indent:1rem;
					span{
						color:#ff4343;
					}
				}
				.table{
					margin:.75rem auto 0;
					width:94%;
					border:0;
					border-collapse :collapse ;
					tr{
						height:1.25rem;
						background:#fff;
						&.table_head{
							background:#ff4343;
							color:#fff;
							td{
								font-size:.7rem;
								border-color:#ff4343;
								text-align:center;
							}
						}
						td{
							font-size:.6rem;
							border-color:#c3c0c0;
							&:nth-child(1){
								padding:0 5px;
								text-align:left;
							}
							&:nth-child(2){
								width:4.7rem;
							}
						}
					}
				}
				.sure{
					margin:.75rem auto;
					width:90%;
					height:2.2rem;
					background:#ff4343;
					color:#fff;
					font-size:.9rem;
					line-height:2.2rem;
					border-radius:10px;
					letter-spacing:10px;
				}
			}
		}
		.result_fail{
			width:100%;
			.fail_img_wrapper{
				margin-top:2.25rem;
				float:left;
				width:100%;
				height:6rem;
			}
			.fail_img{
				margin:0 auto;
				display:block;
				width:6rem;
				height:6rem;
			}
			span{
				float:left;
				width:100%;
				height:2.2rem;
				line-height:2.2rem;
				color:#666;
				font-size:1.2rem;
			}
			p{
				padding-top:1rem;
				margin:0 auto;
				width:90%;
				line-height:1rem;
				font-size:.75rem;
				color:#292928;
				text-align:left;
			}
			.fail_btn{
				margin:2rem auto;
				width:60%;
				height:2.2rem;
				background:#ff6600;
				color:#fff;
				font-size:.9rem;
				line-height:2.2rem;
				border-radius:10px;
			}
		}
		.modal_wrapper{
			position:absolute;
			left:0;
			top:0;
			right:0;
			bottom:0;
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			.modal{
				margin:10rem auto 0;
				width:70%;
				background:#fff;
				border-radius:5px;
				.modal_title{
					float:left;
					width:100%;
					height:2rem;
					background:#f6f6f6;
					font-size:.75rem;
					line-height:2rem;
					text-indent:10px;
					color:#43a9ff;
					text-align:left;
					border-radius:5px 5px 0 0;
					img{
						float:right;
						margin-right:.375rem;
						margin-top:.375rem;
						width:1.2rem;
						height:1.2rem;
					}
				}
				.modal_cont{
					float:left;
					padding:1rem 0 1rem 5%;
					width:90%;
					line-height:1rem;
					font-size:.7rem;
					color:#3c3d3e;
					text-align:left;
				}
			}
		}
	}
</style>