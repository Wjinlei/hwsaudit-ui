<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="~@/assets/logo.svg" class="logo" alt="logo" />
              <span class="title">{{ $t('home.header.title') }}</span>
            </a>
          </div>
          <div class="desc">{{ $t('home.header.os') }}： {{ $store.getters.os }}</div>
        </div>

        <a-row type="flex" justify="center" :gutter="[0, 16]">
          <a-spin :spinning="spinning" :tip="$t('home.content.form.loading')" size="large">
            <a-col>
              <a-card style="width: 1300px">
                <template slot="title">
                  <a-icon :component="fileSettingIcon" />
                  {{ $t('home.content.audit.setting') }}
                </template>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :labelCol="{ span: 2 }" :wrapperCol="{ span: 21 }">
                    <template slot="label">
                      <a-space>
                        <a-icon :component="folderViewIcon" style="font-size: 17px" />
                        {{ $t('home.content.form.path.label') }}
                      </a-space>
                    </template>
                    <a-input
                      v-decorator="[
                        'path',
                        {
                          rules: [{ required: true, message: $t('home.content.form.path.required') }],
                          initialValue: '/'
                        }
                      ]"
                      :placeholder="$t('home.content.form.path.placeholder')"
                    />
                  </a-form-item>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 15 }">
                        <template slot="label">
                          <a-space>
                            <a-icon :component="userIcon" style="font-size: 17px" />
                            {{ $t('home.content.form.user.label') }}
                          </a-space>
                        </template>
                        <a-space>
                          <a-input
                            style="width: 390px;"
                            v-decorator="['user', { initialValue: '' }]"
                            :placeholder="$t('home.content.form.user.placeholder')"
                          />
                          <icon-tooltip>
                            检查文件所有者, 留空表示不检查<br/>
                            填写“用户名”表示属于该所有者<br/>
                            填写“-用户名”表示不属于该所有者<br/>
                            填写“-”表示所有者为空
                          </icon-tooltip>
                        </a-space>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }">
                        <template slot="label">
                          <a-space>
                            <a-icon :component="faclIcon" style="font-size: 17px" />
                            {{ $t('home.content.form.facl.label') }}
                          </a-space>
                        </template>
                        <a-space>
                          <a-input
                            style="width: 468px;"
                            v-decorator="['facl', { initialValue: '' }]"
                            :placeholder="$t('home.content.form.facl.placeholder')"
                          />
                          <icon-tooltip>
                            检查ACL权限, 留空表示不检查<br/>
                            填写示例: u1:7,u2:*,*:5,*:*<br/>
                            用户: *表示不限制, 多个用户时, 满足其中任意一个就算匹配<br/>
                            权限: 数字格式, *表示不限制, 0表示空权限
                          </icon-tooltip>
                        </a-space>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 15 }">
                        <template slot="label">
                          <a-space>
                            <a-icon :component="permissionIcon" style="font-size: 17px" />
                            <span style="letter-spacing: 1px">{{ $t('home.content.form.mode.label') }}</span>
                          </a-space>
                        </template>
                        <a-space>
                          <a-input
                            style="width: 390px;"
                            v-decorator="['mode', { initialValue: '**2' }]"
                            :placeholder="$t('home.content.form.mode.placeholder')"
                          />
                          <icon-tooltip>
                            检查UGO权限, 留空表示不检查<br/>
                            填写示例: 777、007、**2<br/>
                            权限: 数字格式, *表示不限制, 0表示空权限
                          </icon-tooltip>
                        </a-space>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }">
                        <template slot="label">
                          <a-space>
                            <a-icon :component="profileIcon" style="font-size: 17px; margin-top: 11px" />
                            {{ $t('home.content.form.other.label') }}
                          </a-space>
                        </template>
                        <a-checkbox-group
                          v-decorator="['other', { initialValue: ['checkFile', 'checkDirectory'] }]"
                          style="width: 100%"
                        >
                          <a-row type="flex" justify="space-between">
                            <a-checkbox value="t"> {{ $t('home.content.form.t') }} </a-checkbox>
                            <a-checkbox value="s"> {{ $t('home.content.form.s') }} </a-checkbox>
                            <a-checkbox value="checkFile"> {{ $t('home.content.form.chkfile') }} </a-checkbox>
                            <a-checkbox value="checkDirectory"> {{ $t('home.content.form.chkdirectory') }} </a-checkbox>
                          </a-row>
                        </a-checkbox-group>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-form-item :wrapperCol="{ span: 24, offset: 2 }">
                    <a-button size="large" icon="search" htmlType="submit" type="primary">{{
                      $t('home.content.form.submit')
                    }}</a-button>
                  </a-form-item>
                </a-form>
              </a-card>
            </a-col>
            <a-col>
              <a-card style="width: 1300px">
                <template slot="title">
                  <a-icon :component="fileSearchIcon" />
                  {{ $t('home.content.audit.result') }}
                </template>
                <s-table
                  ref="table"
                  :columns="columns"
                  :data="loadData"
                  rowKey="id"
                  size="middle"
                  :pageSize="500"
                  :pagination="{
                    showQuickJumper: true,
                    pageSizeOptions: ['500', '1000', '2000', '5000'],
                    size: 'small',
                    showTotal: total => {
                      return `共有 ${total} 条结果`
                    }
                  }"
                />
              </a-card>
            </a-col>
          </a-spin>
        </a-row>

        <div class="footer">
          <div class="copyright">{{ $t('home.copyright') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STable } from '@/components'
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'
import IconTooltip from '@/components/IconTooltip'
import {
  fileSetting as fileSettingIcon,
  folderView as folderViewIcon,
  user as userIcon,
  facl as faclIcon,
  permission as permissionIcon,
  profile as profileIcon,
  fileSearch as fileSearchIcon
} from '@/core/icons'
import { getResult, postStartAudit } from '@/api/home'
const fields = ['path', 'user', 'mode', 'facl', 'other']

export default {
  name: 'UserLayout',
  components: {
    SelectLang,
    IconTooltip,
    STable
  },
  mixins: [deviceMixin],
  created() {
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  computed: {
    columns() {
      return [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100,
          ellipsis: true
        },
        {
          title: this.$t('home.table.name'),
          dataIndex: 'name',
          key: 'name',
          ellipsis: true,
          width: 200
        },
        {
          title: this.$t('home.table.path'),
          dataIndex: 'path',
          key: 'path',
          ellipsis: true,
          width: 400
        },
        {
          title: this.$t('home.table.user'),
          dataIndex: 'user',
          key: 'user',
          width: 150,
          ellipsis: true
        },
        {
          title: this.$t('home.table.mode'),
          dataIndex: 'mode',
          key: 'mode',
          width: 150
        },
        {
          title: this.$t('home.table.facl'),
          dataIndex: 'facl',
          key: 'facl',
          width: 200,
          ellipsis: true,
          scopedSlots: { customRender: 'facl' }
        }
      ]
    }
  },
  data() {
    return {
      fileSettingIcon,
      fileSearchIcon,
      folderViewIcon,
      userIcon,
      faclIcon,
      permissionIcon,
      profileIcon,
      spinning: false,
      form: this.$form.createForm(this),
      loadData: parameter => getResult(parameter)
    }
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.spinning = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          postStartAudit(Object.assign({}, values))
            .then(() => {
              this.$refs.table.refresh(true)
              this.spinning = false
            })
            .catch(() => {
              this.spinning = false
            })
        }
      })
    }
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
