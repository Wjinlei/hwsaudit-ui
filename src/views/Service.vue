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
              <a-card style="width: 1420px">
                <a slot="extra" href="/">{{ $t('home.title') }}</a>
                <template slot="title">
                  <a-icon :component="fileSettingIcon" />
                  {{ $t('home.content.audit.setting') }}
                </template>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
                    <template slot="label">
                      <a-icon :component="profileIcon" style="font-size: 17px; margin-top: 8px" />
                      {{ $t('service.content.form.state.label') }}
                    </template>
                    <a-checkbox-group
                      v-decorator="[
                        'form_state',
                        {
                          initialValue: [
                            'all',
                            'enabled',
                            'enabled-runtime',
                            'linked',
                            'linked-runtime',
                            'masked',
                            'masked-runtime',
                            'generated',
                            'static',
                            'disabled',
                            'invalid'
                          ]
                        }
                      ]"
                    >
                      <a-checkbox @change="onChangeFormStateAll" value="all">
                        {{ $t('service.content.form.state.all') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="enabled">
                        {{ $t('service.content.form.state.enabled') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="enabled-runtime">
                        {{ $t('service.content.form.state.enabled-runtime') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="linked">
                        {{ $t('service.content.form.state.linked') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="linked-runtime">
                        {{ $t('service.content.form.state.linked-runtime') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="masked">
                        {{ $t('service.content.form.state.masked') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="masked-runtime">
                        {{ $t('service.content.form.state.masked-runtime') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="generated">
                        {{ $t('service.content.form.state.generated') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="static">
                        {{ $t('service.content.form.state.static') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="disabled">
                        {{ $t('service.content.form.state.disabled') }}
                      </a-checkbox>
                      <a-checkbox :disabled="disabled" value="invalid">
                        {{ $t('service.content.form.state.invalid') }}
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                  <a-form-item :wrapperCol="{ span: 24, offset: 1 }">
                    <a-space>
                      <a-button size="large" icon="search" htmlType="submit" type="primary">
                        <span v-if="resultCode === 0">{{ $t('home.content.form.resubmit') }}</span>
                        <span v-else>{{ $t('home.content.form.submit') }}</span>
                      </a-button>

                      <template v-if="resultCode === 0">
                        <a-space>
                          <a-button size="large" icon="export" type="default" @click="exportJSON">
                            {{ $t('home.content.form.export') }}(JSON)
                          </a-button>
                          <a-button size="large" icon="export" type="default" @click="exportXml">
                            {{ $t('home.content.form.export') }}(XML)
                          </a-button>
                        </a-space>
                      </template>
                    </a-space>
                  </a-form-item>
                </a-form>
              </a-card>
            </a-col>
            <a-col>
              <a-card style="width: 1420px">
                <template slot="title">
                  <a-icon :component="fileSearchIcon" />
                  {{ $t('home.content.audit.result') }}
                  <span v-if="totalCount > 0" style="color: red">{{ totalCount }}</span>
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
                    size: 'default',
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
import { download } from '@/components/_util/util'
import { fileSetting as fileSettingIcon, profile as profileIcon, fileSearch as fileSearchIcon } from '@/core/icons'
import { getService, postService, postExportXmlService, postExportJsonService } from '@/api/service'
const fields = ['form_state']

export default {
  name: 'UserLayout',
  components: {
    SelectLang,
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
          title: this.$t('service.table.name'),
          dataIndex: 'name',
          key: 'name',
          ellipsis: true,
          width: 300
        },
        {
          title: this.$t('service.table.state'),
          dataIndex: 'state',
          key: 'state',
          ellipsis: true,
          width: 120
        },
        {
          title: this.$t('service.table.description'),
          dataIndex: 'description',
          key: 'description',
          width: 300,
          ellipsis: true
        },
        {
          title: this.$t('service.table.path'),
          dataIndex: 'path',
          key: 'path',
          ellipsis: true,
          width: 550
        }
      ]
    }
  },
  data() {
    return {
      fileSearchIcon,
      fileSettingIcon,
      profileIcon,
      spinning: false,
      form: this.$form.createForm(this),
      resultCode: 1,
      totalCount: 0,
      disabled: true,
      loadData: parameter => {
        return getService(parameter).then(res => {
          this.totalCount = res.result.totalCount
          this.resultCode = res.code
          return res
        })
      }
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
          postService(Object.assign({}, values))
            .then(() => {
              this.$refs.table.refresh(true)
              this.spinning = false
            })
            .catch(() => {
              this.spinning = false
            })
        }
      })
    },
    exportJSON() {
      postExportJsonService().then(res => {
        const blob = new Blob([res])
        download('service.json', blob)
      })
    },
    exportXml() {
      postExportXmlService().then(res => {
        const blob = new Blob([res])
        download('service.xml', blob)
      })
    },
    onChangeFormStateAll(e) {
      const state = this.form.getFieldValue('form_state')
      if (e.target.checked) {
        this.form.setFieldsValue({
          form_state: Object.assign(state, [
            'enabled',
            'enabled-runtime',
            'linked',
            'linked-runtime',
            'masked',
            'masked-runtime',
            'generated',
            'static',
            'disabled',
            'invalid'
          ])
        })
        this.disabled = true
      } else {
        state.length = 0
        const all = new Array('all')
        this.form.setFieldsValue({
          form_state: Object.assign(state, all)
        })
        this.disabled = false
      }
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

  /deep/ .ant-table-pagination {
    width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;

    .ant-pagination-total-text {
      width: 100%;
    }
  }

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
